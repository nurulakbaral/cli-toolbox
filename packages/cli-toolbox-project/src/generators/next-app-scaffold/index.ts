import { spawnSync } from 'node:child_process'
import { type NodePlopAPI } from 'plop'
import { TActions } from '../types'

type TAnswers = {
  packageManager: 'npm' | 'pnpm' | 'bun'
  setupFolderStructure: boolean
  setupCodingStyle: boolean
}

const delayLog = (msg: string) => (_answers: Record<string, any>) => new Promise<string>((resolve) => resolve(msg))

export default function (plop: NodePlopAPI) {
  plop.setActionType('install-dependencies', async (answers, _config, _plop) => {
    const { packageManager } = answers as TAnswers
    const command = {
      npm: 'npm install',
      pnpm: 'pnpm add',
      bun: 'bun add',
    }
    const processResult = spawnSync(
      command[packageManager],
      ['-D', 'prettier', 'eslint', 'eslint-config-prettier', 'husky', 'lint-staged'],
      {
        stdio: ['inherit', 'inherit', 'pipe'],
        shell: true,
      }
    )

    if (processResult.error || processResult.status !== 0 || processResult.signal !== null) {
      const errorMessage = processResult.stderr.toString()
      console.error('❌ Error installing dependencies:', errorMessage)
      process.exit(1)
    }

    return '✅ Dependencies installed successfully!'
  })
  plop.setActionType('init-husky', async (answers, _config, _plop) => {
    const { packageManager } = answers as TAnswers
    const command = {
      npm: 'npx husky init',
      pnpm: 'pnpm exec husky init',
      bun: 'bunx husky init',
    }
    const processResult = spawnSync(command[packageManager], {
      stdio: ['inherit', 'inherit', 'pipe'],
      shell: true,
    })

    if (processResult.error || processResult.status !== 0 || processResult.signal !== null) {
      const errorMessage = processResult.stderr.toString()
      console.error('❌ Error initializing Husky:', errorMessage)
      process.exit(1)
    }

    return '✅ Husky initialized successfully!'
  })
  plop.setGenerator('next-app-scaffold', {
    prompts: [
      {
        type: 'confirm',
        name: 'setupFolderStructure',
        message: 'Do you want to setup the folder structure for the Next.js app?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        type: 'confirm',
        name: 'setupCodingStyle',
        message: "Do you want to setup ESLint and Prettier for the Next.js app's coding style?",
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        when: (answers) => answers.setupCodingStyle,
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you use?',
        choices: ['npm', 'pnpm', 'bun'],
        default: 'npm',
      },
    ],
    actions: function (ctx) {
      let answers = ctx as TAnswers
      let actions: TActions<TAnswers> = []

      if (answers.setupFolderStructure) {
        actions.push(
          // Note: Add root folder and files.
          {
            type: 'addMany',
            destination: './',
            base: 'templates/folder-structure',
            templateFiles: [
              'templates/folder-structure/@types/*',
              'templates/folder-structure/ci/**/*',
              'templates/folder-structure/archives/*',
              'templates/folder-structure/scripts/*',
            ],
            globOptions: {
              dot: true,
            },
            force: false,
            abortOnFail: false,
          },
          // Note: Add public folder structure.
          {
            type: 'addMany',
            destination: './',
            base: 'templates/folder-structure',
            templateFiles: ['templates/folder-structure/public/**/*'],
            globOptions: {
              dot: true,
            },
            force: false,
            abortOnFail: false,
          },
          // Note: Add source folder structure.
          {
            type: 'addMany',
            destination: './',
            templateFiles: ['templates/folder-structure/src/**/*'],
            base: 'templates/folder-structure',
            globOptions: {},
            force: false,
            abortOnFail: false,
          }
        )
      }

      if (answers.setupCodingStyle) {
        actions.push(
          delayLog('⌛ Installing dependencies...'),
          {
            type: 'install-dependencies',
            abortOnFail: true,
          },
          delayLog('⌛ Initializing Husky...'),
          {
            type: 'init-husky',
            abortOnFail: true,
          },
          {
            type: 'addMany',
            destination: './',
            templateFiles: ['templates/coding-style/**/*'],
            base: 'templates/coding-style',
            globOptions: {
              dot: true,
            },
            force: true,
          }
        )
      }

      return actions
    },
  })
}

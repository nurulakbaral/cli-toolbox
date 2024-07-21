import { spawnSync } from 'node:child_process'
import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  confirm: boolean
  packageManager: 'npm' | 'pnpm' | 'bun'
}

const delayLog = (msg: string) => (_answers: Record<string, any>) => new Promise<string>((resolve) => resolve(msg))

export default function (plop: NodePlopAPI) {
  plop.setActionType('installDependencies', async (answers, _config, _plop) => {
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

    return 'Dependencies installed successfully!'
  })
  plop.setActionType('initHusky', async (answers, _config, _plop) => {
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

    return 'Husky initialized successfully!'
  })
  plop.setGenerator('next-app-prettier-eslint', {
    description: 'Setup Prettier and ESLint for Next.js App',
    prompts: [
      {
        name: 'confirm',
        type: 'confirm',
        message:
          'This setup will install Prettier and ESLint and overwrite your existing configuration files. Do you want to continue?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        type: 'list',
        name: 'packageManager',
        default: 'npm',
        message: 'Which package manager do you use?',
        choices: ['npm', 'pnpm', 'bun'],
      },
    ],
    actions: function (answers) {
      const answer = answers as TAnswers

      if (!answer.confirm) {
        return []
      }

      return [
        delayLog('⌛ Installing dependencies...'),
        {
          type: 'installDependencies',
        },
        delayLog('⌛ Initializing Husky...'),
        {
          type: 'initHusky',
        },
        {
          type: 'addMany',
          destination: './',
          templateFiles: ['templates/**/*'],
          globOptions: {
            dot: true,
          },
          force: true,
          abortOnFail: true,
        },
      ]
    },
  })
}

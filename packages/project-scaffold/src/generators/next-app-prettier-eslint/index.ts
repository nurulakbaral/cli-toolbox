import { spawnSync } from 'node:child_process'
import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  confirm: boolean
  packageManager: 'npm' | 'pnpm' | 'bun'
}

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
        message:
          'This setup will install Prettier and ESLint and overwrite your existing configuration files.\nDo you want to continue (y/n)?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          if (value === 'n') {
            process.exit(0)
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
    actions: [
      {
        type: 'installDependencies',
      },
      {
        type: 'initHusky',
      },
      {
        type: 'add',
        path: './.lintstagedrc.json',
        templateFile: './templates/.lintstagedrc.json',
        force: true,
      },
      {
        type: 'add',
        path: './.eslintrc.json',
        templateFile: './templates/.eslintrc.json',
        force: true,
      },
      {
        type: 'add',
        path: './.eslintignore',
        templateFile: './templates/.eslintignore',
        force: true,
      },
      {
        type: 'add',
        path: './.prettierrc.json',
        templateFile: './templates/.prettierrc.json',
        force: true,
      },
      {
        type: 'add',
        path: './.prettierignore',
        templateFile: './templates/.prettierignore',
        force: true,
      },
      {
        type: 'add',
        path: './.vscode/settings.json',
        templateFile: './templates/.vscode/settings.json',
        force: true,
      },
      {
        type: 'add',
        path: './.husky/pre-commit',
        templateFile: './templates/.husky/pre-commit',
        force: true,
      },
    ],
  })
}

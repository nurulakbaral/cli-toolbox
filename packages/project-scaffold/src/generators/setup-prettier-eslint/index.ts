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
    const process = spawnSync(
      command[packageManager],
      ['-D', 'prettier', 'eslint-config-prettier', 'husky', 'lint-staged'],
      {
        stdio: 'inherit',
        shell: true,
      }
    )

    if (process.error) {
      throw new Error(process.error.message)
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
    const process = spawnSync(command[packageManager], {
      stdio: 'inherit',
      shell: true,
    })
    if (process.error) {
      throw new Error(process.error.message)
    }

    return 'Husky initialized successfully!'
  })
  plop.setGenerator('setup-prettier-eslint', {
    description: 'Setup Prettier and ESLint for Next.js project',
    prompts: [
      {
        type: 'confirm',
        name: 'confirm',
        message:
          'This setup will install Prettier and ESLint and overwrite your existing configuration files.\nDo you want to continue?',
        default: false,
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

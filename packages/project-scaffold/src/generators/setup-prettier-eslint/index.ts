import { type NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('setup-prettier-eslint', {
    description: 'Setup Prettier and ESLint for Next.js project',
    prompts: [
      {
        type: 'confirm',
        name: 'confirm',
        message:
          'This setup will install Prettier and ESLint and overwrite your existing configuration files. Do you want to continue?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: './.eslintrc.json',
        templateFile: './templates/.eslintrc.json.hbs',
        force: true,
      },
      {
        type: 'add',
        path: './.eslintignore',
        templateFile: './templates/.eslintignore.hbs',
        force: true,
      },
      {
        type: 'add',
        path: './.prettierrc.json',
        templateFile: './templates/.prettierrc.json.hbs',
        force: true,
      },
      {
        type: 'add',
        path: './.prettierignore',
        templateFile: './templates/.prettierignore.hbs',
        force: true,
      },
    ],
  })
}

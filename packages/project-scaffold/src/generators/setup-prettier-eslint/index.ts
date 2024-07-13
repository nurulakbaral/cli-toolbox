import { type NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
  plop.setGenerator('setup-prettier-eslint', {
    description: 'Setup Prettier and ESLint for Next.js project',
    prompts: [
      {
        type: 'input',
        name: 'pathName',
        message: 'What is the path to the Next.js project?',
        default: './',
      },
    ],
    actions: [
      {
        type: 'modify',
        path: '{{pathName}}/eslint.json',
        templateFile: 'templates/eslint.json.hbs',
      },
    ],
  })
}

import { type NodePlopAPI, type ActionType } from 'plop'

export type TAnswers = {
  rootDir: boolean
  publicDir: boolean
  srcDir: boolean
}
export type TDynamicActionsFunction = (answers?: TAnswers) => ActionType[]
export type TActions = TDynamicActionsFunction | ActionType[]

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-app-structure', {
    description: 'Setup Folder Structure for Next.js App (App Router)',
    prompts: [
      {
        name: 'rootDir',
        type: 'confirm',
        message: 'Do you want to configure the root folder structure for the Next.js app?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        name: 'publicDir',
        type: 'confirm',
        message: 'Do you want to configure the public folder?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        name: 'srcDir',
        type: 'confirm',
        message: 'Do you want to configure the src folder?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
    ],
    actions: function (ctx) {
      const answers = ctx as TAnswers
      const actions: TActions = []

      if (answers.rootDir) {
        actions.push({
          type: 'addMany',
          destination: './',
          templateFiles: ['templates/@types/*', 'templates/ci/**/*', 'templates/archives/*', 'templates/scripts/*'],
          globOptions: {
            dot: true,
          },
          force: false,
          abortOnFail: true,
        })
      }

      if (answers.publicDir) {
        actions.push({
          type: 'addMany',
          destination: './',
          templateFiles: ['templates/public/**/*'],
          globOptions: {
            dot: true,
          },
          force: false,
          abortOnFail: true,
        })
      }

      if (answers.srcDir) {
        actions.push({
          type: 'addMany',
          destination: './',
          templateFiles: ['templates/src/**/*'],
          globOptions: {},
          force: false,
          abortOnFail: true,
        })
      }

      return actions
    },
  })
}

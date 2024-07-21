import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  rootDir: 'y' | 'n'
  publicDir: 'y' | 'n'
  srcDir: string
}

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-app-structure', {
    description: 'Setup Folder Structure for Next.js App (App Router)',
    prompts: [
      {
        name: 'rootDir',
        message: 'Do you want to configure the root folder structure for the Next.js app (y/n)?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
      {
        name: 'publicDir',
        message: 'Do you want to configure the public folder (y/n)?',
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
        message: 'Do you want to configure the src folder (y/n)?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        skip: (answeres: TAnswers) => answeres.rootDir === 'n',
        destination: './',
        templateFiles: ['templates/@types/*', 'templates/ci/**/*', 'templates/archives/*', 'templates/scripts/*'],
        globOptions: {
          dot: true,
        },
        force: false,
        abortOnFail: true,
      },
      {
        type: 'addMany',
        skip: (answeres: TAnswers) => answeres.publicDir === 'n',
        destination: './',
        templateFiles: ['templates/public/**/*'],
        globOptions: {
          dot: true,
        },
        force: false,
        abortOnFail: true,
      },
      {
        type: 'addMany',
        destination: './',
        templateFiles: ['templates/src/**/*'],
        globOptions: {},
        force: false,
        abortOnFail: true,
      },
    ],
  })
}

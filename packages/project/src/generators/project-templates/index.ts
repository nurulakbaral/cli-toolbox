import { type NodePlopAPI } from 'plop'
import { TActions } from '../types'

type TAnswers = {
  setupPath: boolean
  templateNames: Array<'service' | 'feature'>
  servicePath: string | undefined
  featurePath: string | undefined
  serviceName: string | undefined
  featureName: string | undefined
}

export default function (plop: NodePlopAPI) {
  plop.setGenerator('project-templates', {
    prompts: [
      {
        type: 'confirm',
        name: 'setupPath',
        message: 'Do you want to setup path?',
        validate: (value) => {
          if (value !== 'y' && value !== 'n') {
            return 'Please enter "y" to continue or "n" to exit.'
          }

          return true
        },
        default: false,
      },
      {
        when: (answers) => (answers as TAnswers).setupPath,
        type: 'input',
        name: 'servicePath',
        message: 'Enter the path for the service:',
        default: './src/services',
      },
      {
        when: (answers) => (answers as TAnswers).setupPath,
        type: 'input',
        name: 'featurePath',
        message: 'Enter the path for the feature:',
        default: './src/features',
      },
      {
        type: 'checkbox',
        name: 'templateNames',
        message: "Choose the template you'd like to generate\n",
        choices: [
          { name: 'Service', value: 'service' },
          { name: 'Feature', value: 'feature' },
        ],
        default: ['service'],
      },
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter the service name:',
        when: (answers) => (answers as TAnswers).templateNames.includes('service'),
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'Enter the feature name:',
        when: (answers) => (answers as TAnswers).templateNames.includes('feature'),
      },
    ],
    actions: function (ctx) {
      let answers = ctx as TAnswers
      let actions: TActions<TAnswers> = []

      if (answers.templateNames.includes('service')) {
        actions.push({
          type: 'addMany',
          destination: `${answers.servicePath || './src/services'}/{{serviceName}}`,
          base: 'templates/service',
          templateFiles: ['templates/service/**/*'],
          force: false,
          abortOnFail: false,
        })
      }

      if (answers.templateNames.includes('feature')) {
        actions.push({
          type: 'addMany',
          destination: `${answers.featurePath || './src/features'}/{{featureName}}`,
          base: 'templates/feature',
          templateFiles: ['templates/feature/**/*'],
          force: false,
          abortOnFail: false,
        })
      }

      return actions
    },
  })
}

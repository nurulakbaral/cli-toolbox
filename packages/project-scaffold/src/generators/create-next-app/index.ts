import { type NodePlopAPI } from 'plop'
import { spawnSync } from 'node:child_process'

export default function (plop: NodePlopAPI) {
  plop.setActionType('next-app', (answers, _config, _plop) => {
    const result = spawnSync('npx', [`create-next-app@${answers.version}`], {
      stdio: 'inherit',
      shell: true,
    })

    if (result.error) {
      throw result.error
    }

    return 'Next.js app created!'
  })

  plop.setGenerator('create-next-app', {
    description: 'Create a new Next.js app',
    prompts: [
      {
        type: 'list',
        name: 'version',
        message: 'Which version of Next.js would you like to use?',
        default: 'latest',
        choices: [
          {
            name: 'Latest',
            value: 'latest',
          },
          {
            name: '14',
            value: '14',
          },
          {
            name: '13',
            value: '13',
          },
        ],
      },
    ],
    actions: [
      {
        type: 'next-app',
      },
    ],
  })
}

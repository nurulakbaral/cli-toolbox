import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  packageManager: 'npm' | 'pnpm' | 'bun'
}

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-app-clean', {
    description: 'Clean Next.js App from Create Next App',
    prompts: [],
    actions: [],
  })
}

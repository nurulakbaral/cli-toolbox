import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  packageManager: 'npm' | 'pnpm' | 'bun'
}

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-app-structure', {
    description: 'Setup Folder Structure for Next.js App (App Router)',
    prompts: [],
    actions: [],
  })
}

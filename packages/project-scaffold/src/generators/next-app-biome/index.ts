import { type NodePlopAPI } from 'plop'

export interface TAnswers {
  packageManager: 'npm' | 'pnpm' | 'bun'
}

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-app-biome', {
    description: 'Setup Biome for Next.js App',
    prompts: [],
    actions: [],
  })
}

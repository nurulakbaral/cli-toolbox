import { type NodePlopAPI } from 'plop'

export default async function (plop: NodePlopAPI) {
  await plop.load('./generators/next-app-structure', {}, true)
  await plop.load('./generators/next-app-prettier-eslint', {}, true)
  await plop.load('./generators/next-app-biome', {}, true)
}

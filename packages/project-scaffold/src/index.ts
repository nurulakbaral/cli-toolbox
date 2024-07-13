import { type NodePlopAPI } from 'plop'

export default async function (plop: NodePlopAPI) {
  await plop.load('./generators/create-next-app', {}, true)
  await plop.load('./generators/setup-prettier-eslint', {}, true)
}
import { type NodePlopAPI } from 'plop'

export default async function (plop: NodePlopAPI) {
  await plop.load('./generators/next-app-scaffold', {}, true)
  await plop.load('./generators/project-templates', {}, true)
}

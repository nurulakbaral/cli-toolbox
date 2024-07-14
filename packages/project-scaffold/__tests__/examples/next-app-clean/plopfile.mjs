/** @param {import('plop').NodePlopAPI} plop */
export default async function config(plop) {
  await plop.load('../../dist')
}

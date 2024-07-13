/** @param {import('plop').NodePlopAPI} plop */
export default async function (plop) {
  await plop.load('../dist/index.js', {}, true)
}

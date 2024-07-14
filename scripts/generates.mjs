import { spawnSync } from 'node:child_process'

const dirs = ['./packages/project-scaffold/__tests__/examples/next-app-prettier-eslint']

dirs.forEach((dir) => {
  spawnSync('cd', [dir, '&&', 'plop', '--plopfile', './plopfile.mjs'], { stdio: 'inherit', shell: true })
})

console.log('Successfully generated `examples` folders.')

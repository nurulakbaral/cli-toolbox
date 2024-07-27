import { spawnSync } from 'node:child_process'

let dirs = ['./packages/project/__tests__/examples/next-app-scaffold']

dirs.forEach((dir) => {
  spawnSync('cd', [dir, '&&', 'plop', '--plopfile', './plopfile.mjs'], { stdio: 'inherit', shell: true })
})

console.log('Successfully generated `examples` folders.')

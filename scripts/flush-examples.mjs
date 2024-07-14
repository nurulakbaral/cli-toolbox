import { globSync } from 'glob'
import { rimrafSync } from 'rimraf'
import * as path from 'node:path'

const dirs = ['./packages/project-scaffold/__tests__/examples/next-app-prettier-eslint/*']

const excludedFiles = dirs
  .map((dir) => [path.join(dir, '../package.json'), path.join(dir, '../plopfile.mjs')])
  .flat(Infinity)

const files = globSync(dirs, {
  dot: true,
})

files.forEach((file) => {
  if (!excludedFiles.includes(file)) {
    rimrafSync(file)
  }
})

console.log('Successfully flushed `examples` folders.')

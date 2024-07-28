import { globSync } from 'glob'
import { rimrafSync } from 'rimraf'
import * as path from 'node:path'
import * as fs from 'node:fs'

let dirs = [
  './packages/project/__tests__/examples/next-app-scaffold/*',
  './packages/project/__tests__/examples/project-templates/*',
]

let excludedFiles = dirs
  .map((dir) => [path.join(dir, '../package.json'), path.join(dir, '../plopfile.mjs')])
  .flat(Infinity)

let files = globSync(dirs, {
  dot: true,
})

files.forEach((file) => {
  if (!excludedFiles.includes(file)) {
    rimrafSync(file)
  }

  if (file.includes('package.json')) {
    try {
      let content = fs.readFileSync(file, 'utf8')
      let packageJson = JSON.parse(content)
      let initialPackageJson = {
        name: packageJson.name,
        type: packageJson.type,
      }
      fs.writeFileSync(file, JSON.stringify(initialPackageJson, null, 2) + '\n', 'utf8')
      console.log('Successfully flushed `package.json` file.')
    } catch (err) {
      console.error('Error:', err)
    }
  }
})

console.log('Successfully flushed `examples` folders.')

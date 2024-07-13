import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type RollupOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { globSync } from 'glob'

const SOURCE_DIR = 'src'
const DESTINATION_DIR = 'dist'

const binFiles = {
  index: './bin/index.js',
}
const sourceFiles = Object.fromEntries(
  globSync(`./${SOURCE_DIR}/**/*.ts`).map((file) => {
    // This remove `src/` as well as the file extension from each.
    // file, so e.g. src/nested/foo.js becomes nested/foo.
    const fileWithoutExtention = path.relative(SOURCE_DIR, file.slice(0, file.length - path.extname(file).length))
    // This expands the relative paths to absolute paths, so e.g.
    // src/nested/foo becomes /project/src/nested/foo.js
    const absolutePath = fileURLToPath(new URL(file, import.meta.url))
    const paths = [fileWithoutExtention, absolutePath]
    return paths
  })
)

const config: RollupOptions = {
  input: { ...sourceFiles, ...binFiles },
  output: {
    dir: DESTINATION_DIR,
    format: 'esm',
    sourcemap: false,
  },
  external: ['plop', 'minimist'],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY' || warning.code === 'EMPTY_BUNDLE') {
      return
    }
    warn(warning)
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
    }),
    json(),
    commonjs(),
    typescript(),
  ],
}

export default config

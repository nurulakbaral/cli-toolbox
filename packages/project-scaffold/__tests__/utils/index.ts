import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import { readFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const packagePath = path.resolve(path.dirname(__filename), '../examples')

export function resolvePath(...paths: string[]): string {
  return path.resolve(packagePath, ...paths)
}

export function getFileContent(path: string) {
  try {
    let content = readFileSync(path, 'utf-8')
    return content
  } catch (e) {
    if (e instanceof Error) {
      throw e
    }
    if (typeof e === 'string') {
      throw new Error(e)
    }
  }
  return ''
}

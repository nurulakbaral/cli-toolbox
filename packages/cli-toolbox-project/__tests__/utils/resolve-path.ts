import { fileURLToPath } from 'node:url'
import * as path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const packagePath = path.resolve(path.dirname(__filename), '../examples')

export function resolvePath(...paths: string[]): string {
  return path.resolve(packagePath, ...paths)
}

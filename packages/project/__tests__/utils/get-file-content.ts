import { readFileSync } from 'node:fs'

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

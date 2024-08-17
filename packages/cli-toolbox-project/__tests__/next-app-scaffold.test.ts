import { describe, expect, test } from 'vitest'
import { compareDir, resolvePath } from './utils'

const NEXT_APP_SCAFFOLD_FOLDER_STRUCTURE = '../../../src/generators/next-app-scaffold/templates/folder-structure'
const NEXT_APP_SCAFFOLD_CODING_STYLE = '../../../src/generators/next-app-scaffold/templates/coding-style'

describe('folder-structure', () => {
  test('should have those assets', () => {
    const { isMatch, diff } = compareDir(
      {
        paths: [
          resolvePath('next-app-scaffold', NEXT_APP_SCAFFOLD_FOLDER_STRUCTURE, '**/*'),
          resolvePath('next-app-scaffold', NEXT_APP_SCAFFOLD_CODING_STYLE, '**/*'),
        ],
      },
      {
        paths: [resolvePath('next-app-scaffold', '**/*')],
      },
      {
        dot: true,
        ignore: ['**/node_modules/**', '**/package.json', '**/package-lock.json', '**/plopfile.mjs'],
      }
    )

    expect(isMatch).toBe(true)
    expect(diff).toEqual([])
  })
})

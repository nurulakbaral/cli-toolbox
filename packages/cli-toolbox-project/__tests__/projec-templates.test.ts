import { describe, expect, test } from 'vitest'
import { compareDir, resolvePath } from './utils'

const GENERATOR_NAME = 'project-templates'
const SERVICE_PATH = `../../../src/generators/${GENERATOR_NAME}/templates/service`
const FEATURE_PATH = `../../../src/generators/${GENERATOR_NAME}/templates/feature`

describe('folder-structure', () => {
  test('should have those assets', () => {
    let { isMatch, diff } = compareDir(
      {
        paths: [resolvePath(GENERATOR_NAME, SERVICE_PATH, '**/*'), resolvePath(GENERATOR_NAME, FEATURE_PATH, '**/*')],
      },
      {
        paths: [resolvePath(GENERATOR_NAME, '**/*')],
      },
      {
        dot: true,
        ignore: ['**/node_modules/**', '**/package.json', '**/package-lock.json', '**/plopfile.mjs'],
      }
    )

    // Note: For now, we only check the typescript files.
    diff = diff.filter((filePath) => filePath.includes('ts') || filePath.includes('tsx'))
    isMatch = isMatch || diff.length === 0

    expect(isMatch).toBe(true)
    expect(diff).toEqual([])
  })
})

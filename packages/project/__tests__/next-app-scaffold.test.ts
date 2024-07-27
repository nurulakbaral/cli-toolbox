import { describe, expect, test } from 'vitest'
import { glob } from 'glob'
import * as path from 'node:path'
import { resolvePath, getFileContent } from './utils'

const NEXT_APP_SCAFFOLD_FOLDER_STRUCTURE = '../../../src/generators/next-app-scaffold/templates/folder-structure'

describe('folder-structure', () => {
  const templateFilesPath = resolvePath('next-app-scaffold', NEXT_APP_SCAFFOLD_FOLDER_STRUCTURE, '**/*')
  const templateFiles = glob
    .sync(templateFilesPath, {
      dot: true,
    })
    .map((filePath) => path.basename(filePath))
    .map((filePath) => filePath.replace('.hbs', ''))
    .filter(
      (filePath) => !['@types', 'ci', 'archives', 'scripts', 'public', 'src'].includes(filePath)
    ) as readonly string[]
  console.log('🪲', templateFilesPath, templateFiles)

  test('should have those assets', () => {})
})

describe('coding-style', () => {
  test('should have those assets', () => {})
  test('should have thos devDependencies', () => {})
  test('should have same content with the template', () => {})
})

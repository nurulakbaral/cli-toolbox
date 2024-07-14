import { describe, expect, test } from 'vitest'
import { glob } from 'glob'
import * as path from 'node:path'
import { resolvePath, getFileContent } from './utils'

const NEXT_APP_PRETTIER_ESLINT_TEMPLATE_PATH = '../../../src/generators/next-app-prettier-eslint/templates'

describe('next-app-prettier-eslint', () => {
  const templateFilesPath = resolvePath('next-app-prettier-eslint', NEXT_APP_PRETTIER_ESLINT_TEMPLATE_PATH, '**/*')
  const templateFiles = glob
    .sync(templateFilesPath, {
      dot: true,
    })
    .map((filePath) => path.basename(filePath)) as readonly string[]
  const devDependencies = ['prettier', 'eslint', 'eslint-config-prettier', 'husky', 'lint-staged']
  const generatedFiles = glob
    .sync(
      [
        // Get dot folders.
        resolvePath('next-app-prettier-eslint', './**/.*'),
        resolvePath('next-app-prettier-eslint', './**/pre-commit'),
        // Get dot files.
        resolvePath('next-app-prettier-eslint', './**/*.json'),
        resolvePath('next-app-prettier-eslint', './**/*ignore'),
      ],
      {
        dot: true,
      }
    )
    .map((filePath) => path.basename(filePath))
  test('should have those assets', () => {
    const actual = templateFiles.every((asset) => generatedFiles.includes(asset))
    expect(templateFiles.length).toEqual(9)
    expect(actual).toBe(true)
  })
  test('should have thos devDependencies', () => {
    const packageJson = require(resolvePath('next-app-prettier-eslint', 'package.json'))
    const actual = devDependencies.every((dep) => packageJson.devDependencies[dep] || packageJson.dependencies[dep])
    expect(actual).toBe(true)
  })
  test('should have same content with the template', () => {
    const actual = templateFiles.every((templateFile) => {
      const isExist = generatedFiles.includes(templateFile)
      if (!isExist) {
        return false
      }

      if (['.vscode', '.husky'].includes(templateFile)) {
        return true
      }

      if (templateFile === 'settings.json') {
        let generatedFileContent = getFileContent(resolvePath('next-app-prettier-eslint', './.vscode/settings.json'))
        let templateFileContent = getFileContent(
          resolvePath('next-app-prettier-eslint', NEXT_APP_PRETTIER_ESLINT_TEMPLATE_PATH, '.vscode/settings.json')
        )

        return generatedFileContent === templateFileContent
      }

      if (templateFile === 'pre-commit') {
        let generatedFileContent = getFileContent(resolvePath('next-app-prettier-eslint', './.husky/pre-commit'))
        let templateFileContent = getFileContent(
          resolvePath('next-app-prettier-eslint', NEXT_APP_PRETTIER_ESLINT_TEMPLATE_PATH, '.husky/pre-commit')
        )

        return generatedFileContent === templateFileContent
      }

      let generatedFileContent = getFileContent(resolvePath('next-app-prettier-eslint', templateFile))
      let templateFileContent = getFileContent(
        resolvePath('next-app-prettier-eslint', NEXT_APP_PRETTIER_ESLINT_TEMPLATE_PATH, templateFile)
      )

      return generatedFileContent === templateFileContent
    })

    expect(actual).toBe(true)
    expect(templateFiles.length).toEqual(9)
  })
})
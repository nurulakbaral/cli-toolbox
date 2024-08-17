import { type GlobOptions, glob } from 'glob'
import * as path from 'node:path'

type TCompareDirParam = {
  paths: Array<string>
}

type TCompareDirResult = {
  isMatch: boolean
  diff: Array<string>
}

export function compareDir(
  first: TCompareDirParam,
  second: TCompareDirParam,
  globOptions?: GlobOptions
): TCompareDirResult {
  const dirTemplate = new Set(
    glob
      .sync(first.paths, {
        dot: true,
        ...(globOptions || {}),
      })
      .map((filePath) => path.basename(filePath.toString()))
      .map((filePath) => filePath.replace('.hbs', '')) as string[]
  )

  const dirGenerated = new Set(
    glob
      .sync(second.paths, {
        dot: true,
        ...(globOptions || {}),
      })
      .map((filePath) => path.basename(filePath.toString())) as string[]
  )

  // Note: Return the unique filepath.
  const diffDirTemplateAgainsDirGenerated =
    Array.from(dirTemplate).filter((filePath) => !dirGenerated.has(filePath)) || []
  const diffDirGeneratedAgainsDirTemplate =
    Array.from(dirGenerated).filter((filePath) => !dirTemplate.has(filePath)) || []

  const diff = [...diffDirTemplateAgainsDirGenerated, ...diffDirGeneratedAgainsDirTemplate]

  return {
    isMatch: diff.length === 0,
    diff,
  }
}

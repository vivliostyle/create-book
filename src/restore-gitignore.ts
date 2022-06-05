import fs from 'node:fs'
import path from 'node:path'

/**
 * A file named `.gitignore` cannot be included in npm.
 *
 * Therefore, you need to prepare a file name without `. `, so prepare the file name without `. Replace it with a proper name by post-processing.
 */
const FILENAME_GITIGNORE_PLACEHOLDER = 'gitignore'

/**
 * File name of `.gitignore`
 */
const FILENAME_GITIGNORE = '.gitignore'

/**
 * Restores `gitignore` on the generated project to its original filename, `.gitignore`.
 * @param packageDir - The path to the project directory generated by Create Book.
 * @returns `true` is success, `false` otherwise.
 */
export const restoreGitIgnore = (packageDir: string): boolean => {
  const oldPath = path.join(packageDir, FILENAME_GITIGNORE_PLACEHOLDER)
  const newPath = path.join(packageDir, FILENAME_GITIGNORE)
  fs.renameSync(oldPath, newPath)

  if (fs.existsSync(newPath)) {
    console.log('Restore .gitignore')
  } else {
    console.log('Failt: Restore .gitignore')
  }

  return fs.existsSync(newPath)
}
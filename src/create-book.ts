import upath from 'upath'
import chalk from 'chalk'
import { AfterHookOptions, create } from 'create-create-app'
import { getThemeInfo } from './themes'
import { thematicMarkdown } from './thematic-markdown'
import { restoreGitIgnore } from './restore-gitignore'

/**
 * The caveat message will be shown after the entire process is completed.
 * @param options - Options.
 * @returns Message string.
 */
const caveat = (options: AfterHookOptions): string => {
  try {
    restoreGitIgnore(options.packageDir)
    thematicMarkdown(options.packageDir)
  } catch (err) {
    // Since it is an extra process, no error is displayed.
  }

  return `
${chalk.gray('1.')} cd ${chalk.bold.green(options.name)}
${chalk.gray('2.')} create and edit Markdown files
${chalk.gray('3.')} edit ${chalk.bold.cyan(
    'entry'
  )} field in your ${chalk.bold.green('vivliostyle.config.js')}
${chalk.gray('4.')} ${chalk.cyan('yarn build')} or ${chalk.cyan(
    'npm run build'
  )}

See ${chalk.yellow('https://docs.vivliostyle.org')} for further information.

🖋 Happy writing!
`
}

/**
 * Create a project to edit and publish a book in Vivliostyle.
 * @returns Asynchronous task.
 */
export const createBook = async (): Promise<void> => {
  const themes = await getThemeInfo()
  const templateRoot = upath.resolve(__dirname, '../templates')

  await create('create-book', {
    templateRoot,
    extra: {
      theme: {
        type: 'list',
        describe: 'choose theme',
        // TODO:
        // The type is `string[]`, but doing so results in a `405` error.
        // Need other properties as `create-create-app` or `yargs-interactive`.
        choices: themes as any,
        prompt: 'if-no-arg',
      },
    },
    caveat,
  })
}

#!/usr/bin/env node

import path from 'path'
import chalk from 'chalk'
import { AfterHookOptions, create } from 'create-create-app'
import { listThemes } from './themes'
import { thematicMarkdown } from './thematic-markdown'

/**
 * The caveat message will be shown after the entire process is completed.
 * @param options Options.
 * @returns Message string.
 */
const caveat = (options: AfterHookOptions): string => {
  try {
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
 * Entry point.
 */
async function main() {
  const themes = (await listThemes()).map((result) => ({
    name: `${result.package.name} ${chalk.gray(
      `- ${result.package.description}`
    )}`,
    value: {
      name: result.package.name,
      version: result.package.version,
    },
  }))

  const templateRoot = path.resolve(__dirname, '../templates')

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

main().catch((err) => {
  console.error(err)
})

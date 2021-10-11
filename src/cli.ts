#!/usr/bin/env node

import chalk from 'chalk'
import { AfterHookOptions, create } from 'create-create-app'
import { resolve } from 'path'
import { listThemes } from './themes'

const templateRoot = resolve(__dirname, '../templates')

const caveat = ({ name }: AfterHookOptions) => {
  return `
${chalk.gray('1.')} cd ${chalk.bold.green(name)}
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
main()

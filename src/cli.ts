#!/usr/bin/env node

import {resolve} from 'path';
import {create} from 'create-whatever';

import {listThemes} from './themes';

const templateRoot = resolve(__dirname, '../templates');
const caveat = `
🖋 Happy writing!
`;

async function main() {
  const themes = (await listThemes()).map((result) => ({
    name: result.package.name,
    value: {name: result.package.name, version: result.package.version},
  }));

  create('create-book', {
    templateRoot,
    caveat,
    extra: {
      theme: {
        type: 'list',
        describe: 'choose theme',
        choices: themes as any,
        prompt: 'if-no-arg',
      },
    },
  });
}
main();

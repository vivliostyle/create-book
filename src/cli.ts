#!/usr/bin/env node

import { createBook } from './create-book'

/**
 * Entry point of create-book.
 */
async function main() {
  await createBook()
}

main().catch((err) => {
  console.error(err)
})

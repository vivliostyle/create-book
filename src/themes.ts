import fetch from 'node-fetch'
import chalk from 'chalk'

export interface SearchResponse {
  total: number
  objects: Result[]
}

export interface Result {
  package: Package
  flags: Flags
  score: Score
  searchScore: number
}

export interface Package {
  name: string
  scope: string
  version: string
  description: string
  keywords: string[]
  date: string
  links: Links
  author: Author
  publisher: Publisher
  maintainers: Maintainer[]
}

export interface Links {
  npm: string
  homepage: string
  repository: string
  bugs: string
}

export interface Author {
  name: string
  email: string
  username: string
}

export interface Publisher {
  username: string
  email: string
}

export interface Maintainer {
  username: string
  email: string
}

export interface Flags {
  unstable: boolean
}

export interface Score {
  final: number
  detail: Detail
}

export interface Detail {
  quality: number
  popularity: number
  maintenance: number
}

/**
 * Vovliostyle Theme information for create-book CLI.
 */
export type ThemeInfo = {
  /**
   * Item name on the theme list.
   */
  name: string
  /**
   * Item value on the theme list.
   */
  value: {
    /**
     * Name of the npm package.
     */
    name: string
    /**
     * Version of the npm package.
     */
    version: string
  }
}

const KEYWORD = 'vivliostyle-theme'

export async function listThemes(): Promise<Result[]> {
  const res = await fetch(
    `https://registry.npmjs.org/-/v1/search?text=keywords:${KEYWORD}`
  )
  if (res.ok) {
    return ((await res.json()) as SearchResponse).objects
  } else {
    throw new Error(
      `Failed to get the theme information from https://registry.npmjs.org, HTTP status code: "${res.status}"`
    )
  }
}

/**
 * Get the list of Vovliostyle Theme information for create-book CLI.
 * @returns Information list.
 */
export const getThemeInfo = async (): Promise<ThemeInfo[]> => {
  return (await listThemes()).map((result) => ({
    name: `${result.package.name} ${chalk.gray(
      `- ${result.package.description}`
    )}`,
    value: {
      name: result.package.name,
      version: result.package.version,
    },
  }))
}

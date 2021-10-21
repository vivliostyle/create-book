import fetch from 'node-fetch'

export interface SearchResponse {
  total: number
  results: Result[]
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

const KEYWORD = 'vivliostyle-theme'

export async function listThemes(): Promise<Result[]> {
  const res = await fetch(`https://api.npms.io/v2/search?q=keywords:${KEYWORD}`)
  if (res.ok) {
    return ((await res.json()) as SearchResponse).results
  } else {
    throw new Error(
      `Failed to get the theme information from https://api.npms.io, HTTP status code: "${res.status}"`
    )
  }
}

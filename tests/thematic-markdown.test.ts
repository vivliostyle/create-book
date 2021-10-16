import fs from 'fs'
import path from 'path'
import { thematicMarkdown } from '../src/thematic-markdown'

/**
 * It is processed safely by checking the existence and then deleting the file.
 * @param filePath Path of the target file.
 */
const deleteFileSync = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

describe('Thematic Markdown', () => {
  const projectDir = path.resolve('./tests/sample')
  const defaultFilePath = path.join(projectDir, 'manuscript.md')
  const fooFilePath = path.join(projectDir, 'foo.md')
  const barFilePath = path.join(projectDir, 'bar.md')
  const configFilePath = path.join(projectDir, 'vivliostyle.config.js')
  const escapedConfigFilePath = path.join(projectDir, '_vivliostyle.config.js')

  beforeEach(() => {
    fs.writeFileSync(defaultFilePath, 'Sample', 'utf-8')
    fs.copyFileSync(configFilePath, escapedConfigFilePath)
  })

  afterEach(() => {
    deleteFileSync(fooFilePath)
    deleteFileSync(barFilePath)
    deleteFileSync(defaultFilePath)
    deleteFileSync(configFilePath)
    fs.renameSync(escapedConfigFilePath, configFilePath)
  })

  it('Replace', () => {
    thematicMarkdown(projectDir)
    expect(fs.existsSync(fooFilePath)).toBeTruthy()
    expect(fs.existsSync(barFilePath)).toBeTruthy()

    // Evaluation by require has a cache problem, so check the string
    // `delete require.cache[file]` didn't work
    const config = fs.readFileSync(configFilePath, 'utf-8')
    const entry = `entry: [
    'foo.md',
    'bar.md', // `
    expect(config.indexOf(entry) !== -1).toBeTruthy()
  })
})

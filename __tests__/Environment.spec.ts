import fs from 'fs'
import os from 'os'
import path from 'path'

import * as rsconnect from '../src/main'

describe('Environment', () => {
  let dirPath: string
  let env: rsconnect.Environment
  let curDir: string

  beforeAll(() => {
    curDir = process.cwd()
    const tmpDir = os.tmpdir()

    dirPath = fs.mkdtempSync(path.join(tmpDir, 'rsconnect-ts-'))
    fs.writeFileSync(path.join(dirPath, '.rstudio-connect.env'),
`# fake config file whee
export SCRAMBLE=suitII
SHOVEL='said what'

WING_RUN
MIZMUTH
# IF_I=had my way
set UPBEAT="ritual"
`)

    process.env.CONNECT_ENV_SET_TOAD = 'stool'
    process.env.CONNECT_SET_GONG = 'of catastrophe'
    process.env.WING_RUN = 'epic'

    env = new rsconnect.Environment()
  })

  afterAll(() => {
    process.chdir(curDir)
    fs.rmdirSync(dirPath, { recursive: true })
  })

  it('loads from both process env and file env', () => {
    process.chdir(dirPath)
    env.load()
    expect(env.get('TOAD')).toBe('stool')
    expect(env.get('SCRAMBLE')).toBe('suitII')
  })

  it('loads from process env', () => {
    env.loadProcessEnv()
    expect(env.get('TOAD')).toBe('stool')
    expect(env.has('GONG')).toBe(false)
  })

  it('loads from file env', () => {
    process.chdir(dirPath)
    const loaded = env.loadFileEnv()
    expect(loaded).toBe('.rstudio-connect.env')
    expect(env.get('SCRAMBLE')).toBe('suitII')
    expect(env.get('SHOVEL')).toBe('said what')
    expect(env.get('WING_RUN')).toBe('epic')
    expect(env.has('MIZMUTH')).toBe(false)
    expect(env.has('IF_I')).toBe(false)
    expect(env.get('UPBEAT')).toBe('ritual')
  })
})

import path from 'path'

import { ApplicationPather } from '../src/ApplicationPather'
import { MiniGit } from '../src/MiniGit'

const HERE = path.resolve(__dirname, '.')

class NullGit extends MiniGit {
  public tryExec(): string | null {
    return null
  }
}

class FakeRemoteURLGit extends MiniGit {
  private fakeRemoteURL: string | null

  constructor(fakeRemoteURL: string | null) {
    super()
    this.fakeRemoteURL = fakeRemoteURL
  }

  public remoteURL(): string | null {
    return this.fakeRemoteURL
  }
}

interface testCaseGroup {
  pather: ApplicationPather
  desc: string
  cases: testCase[]
}

interface testCase {
  manifestPath?: string
  appPath?: string
  expected: string
}

describe('ApplicationPather', () => {
  const testCaseGroups: testCaseGroup[] = [
    {
      pather: new ApplicationPather(new FakeRemoteURLGit('git@example.org:sneaky/snowballs.git')),
      desc: 'with ssh git remote',
      cases: [
        { manifestPath: undefined, appPath: undefined, expected: '' },
        {
          manifestPath: undefined,
          appPath: 'mystery/app/',
          expected: '/mystery/app/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: undefined,
          expected: '/example_org/sneaky/snowballs/_tests__/testapps/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: 'fancy/plumber',
          expected: '/fancy/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: undefined,
          expected: '/example_org/sneaky/snowballs/_tests__/testapps/flask/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: '__invalid app path    ',
          expected: '/_invalid_app_path/'
        }
      ]
    },
    {
      pather: new ApplicationPather(new FakeRemoteURLGit('https://example.org/rowdy/rainbows.git')),
      desc: 'with https git remote',
      cases: [
        { manifestPath: undefined, appPath: undefined, expected: '' },
        {
          manifestPath: undefined,
          appPath: 'mystery/app/',
          expected: '/mystery/app/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: undefined,
          expected: '/example_org/rowdy/rainbows/_tests__/testapps/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: 'fancy/plumber',
          expected: '/fancy/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: undefined,
          expected: '/example_org/rowdy/rainbows/_tests__/testapps/flask/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: '__invalid app path    ',
          expected: '/_invalid_app_path/'
        }
      ]
    },
    {
      pather: new ApplicationPather(new FakeRemoteURLGit('not!an,,,,,URL')),
      desc: 'with bogus git remote',
      cases: [
        { manifestPath: undefined, appPath: undefined, expected: '' },
        {
          manifestPath: undefined,
          appPath: 'mystery/app/',
          expected: '/mystery/app/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: undefined,
          expected: '/not_an_____URL/_tests__/testapps/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: 'fancy/plumber',
          expected: '/fancy/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: undefined,
          expected: '/not_an_____URL/_tests__/testapps/flask/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: '__invalid app path    ',
          expected: '/_invalid_app_path/'
        }
      ]
    },
    {
      pather: new ApplicationPather(new FakeRemoteURLGit(null)),
      desc: 'with null git remote',
      cases: [
        { manifestPath: undefined, appPath: undefined, expected: '' },
        {
          manifestPath: undefined,
          appPath: 'mystery/app/',
          expected: '/mystery/app/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: undefined,
          expected: '/rsconnect-ts/_tests__/testapps/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: 'fancy/plumber',
          expected: '/fancy/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: undefined,
          expected: '/rsconnect-ts/_tests__/testapps/flask/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: '__invalid app path    ',
          expected: '/_invalid_app_path/'
        }
      ]
    },
    {
      pather: new ApplicationPather(new NullGit()),
      desc: 'without git',
      cases: [
        { manifestPath: undefined, appPath: undefined, expected: '' },
        {
          manifestPath: undefined,
          appPath: 'mystery/app/',
          expected: '/mystery/app/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: undefined,
          expected: '/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/plumber/manifest.json'),
          appPath: 'fancy/plumber',
          expected: '/fancy/plumber/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: undefined,
          expected: '/flask/'
        },
        {
          manifestPath: path.join(HERE, 'testapps/flask/manifest.json'),
          appPath: '__invalid app path    ',
          expected: '/_invalid_app_path/'
        }
      ]
    }
  ]

  testCaseGroups.forEach((tcg: testCaseGroup) => {
    describe(tcg.desc, () => {
      tcg.cases.forEach((tc: testCase) => {
        beforeEach(() => {
          process.env.OLD_PWD = process.env.PWD
          process.env.PWD = '/fake/path/to/rsconnect-ts'
        })

        afterEach(() => {
          process.env.PWD = process.env.OLD_PWD
        })

        it([
          `resolves manifestPath=${JSON.stringify(tc.manifestPath)},`,
          `appPath=${JSON.stringify(tc.appPath)}`,
          `to ${JSON.stringify(tc.expected)}`
        ].join(' '), () => {
          expect(tcg.pather.resolve(tc.manifestPath, tc.appPath)).toBe(tc.expected)
        })
      })
    })
  })
})

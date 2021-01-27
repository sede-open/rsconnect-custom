import * as rsconnect from '../src/main'

describe('EnvironmentUpdater', () => {
  let eu: rsconnect.EnvironmentUpdater

  beforeEach(() => {
    eu = new rsconnect.EnvironmentUpdater(new FakeAPIClient())
    process.chdir = jest.fn()
  })

  describe('updateAppEnvironment', () => {
    it('works', async () => {
      process.env.CONNECT_ENV_SET_SECRET = 'eye of newt'
      const env = await eu.updateAppEnvironment(42, './somewhar/up/er')
      expect(env.get('MODE')).toBe('ludicrous')
      expect(env.get('SECRET')).toBe('eye of newt')
    })
  })
})

class FakeAPIClient extends rsconnect.APIClient {
  public fakeState: any

  constructor () {
    super({
      baseURL: 'http://fake.example.org/__api__',
      apiKey: 'notAsEcRet'
    })
    this.fakeState = {
      42: {
        appId: 42,
        version: 4,
        values: {
          MODE: 'ludicrous'
        }
      }
    }
  }

  public async getAppEnvironment (appID: number): Promise<any> {
    return this.fakeState[appID]
  }

  public async updateAppEnvironment (appID: number, version: number, env: rsconnect.Environment): Promise<any> {
    const origState = this.fakeState[appID] !== undefined ? this.fakeState[appID] : { values: {} }
    this.fakeState[appID] = {
      ...origState,
      appId: appID,
      version,
      values: {
        ...origState.values,
        ...Object.fromEntries(env.entries())
      }
    }
    return {}
  }
}

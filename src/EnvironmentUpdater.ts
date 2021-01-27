import { APIClient } from './APIClient'
import { Environment } from './Environment'
import { AppEnvironmentResponse } from './api-types'
import { debugLog } from './debugLog'

export class EnvironmentUpdater {
  private readonly client: APIClient

  constructor (client: APIClient) {
    this.client = client
  }

  public async updateAppEnvironment (appID: number, dir: string = '.'): Promise<Environment> {
    debugLog(() => [
      'EnvironmentUpdater: updating environment for',
      `app=${appID}`,
      `dir=${dir}`
    ].join(' '))

    const { version } = await this.client.getAppEnvironment(appID)
    const curDir = process.cwd()
    const env = new Environment()

    try {
      process.chdir(dir)
      env.load()
    } finally {
      process.chdir(curDir)
    }

    const newVersion = version + 1

    debugLog(() => [
      'EnvironmentUpdater: updating environment with bumped',
      `version=${newVersion}`,
      'for',
      `app=${appID}`,
      `dir=${dir}`
    ].join(' '))

    await this.client.updateAppEnvironment(appID, newVersion, env)
    return await this.client.getAppEnvironment(appID)
      .then((resp: AppEnvironmentResponse) => {
        debugLog(() => [
          'EnvironmentUpdater: converting env object to map',
          `resp=${JSON.stringify(resp)}`
        ].join(' '))

        const newEnv = new Environment()
        for (const key in resp.values) {
          newEnv.set(key, resp.values[key])
        }
        return newEnv
      })
  }
}

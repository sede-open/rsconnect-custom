import crypto from 'crypto'
import { URL } from 'url'

import { debugLog } from './debugLog'
import { APIClient } from './APIClient'
import { Bundle } from './Bundle'
import { Bundler } from './Bundler'
import {
  Application,
  ClientTaskResponse,
  DeployTaskResponse
} from './api-types'
import { ListApplicationsPager } from './ListApplicationsPager'
import { ApplicationPather } from './ApplicationPather'

export class Deployer {
  private readonly client: APIClient
  private readonly bundler: Bundler
  private readonly pather: ApplicationPather

  constructor (client: APIClient) {
    this.client = client
    this.bundler = new Bundler()
    this.pather = new ApplicationPather()
  }

  public async deployManifest (manifestPath: string, appPath?: string): Promise<DeployTaskResponse> {
    return await this.deployBundle(await this.bundler.fromManifest(manifestPath), appPath)
  }

  public async deployBundle (bundle: Bundle, appPath?: string): Promise<DeployTaskResponse> {
    const resolvedAppPath = this.pather.resolve(bundle.manifestPath, appPath)

    debugLog(() => [
      'Deployer: initial app path resolution',
      `resolved=${JSON.stringify(resolvedAppPath)}`,
      `orig=${JSON.stringify(appPath)}`
    ].join(' '))

    let appID: number | null = null
    let app: Application | null = null
    let reassignTitle = false

    if (resolvedAppPath !== '') {
      // TODO: use an API that doesn't require scanning all applications, if possible
      const existingApp = await this.findExistingApp(resolvedAppPath)
      if (existingApp !== null) {
        debugLog(() => `Deployer: found existing app=${existingApp.id} at path=${resolvedAppPath}`)
        appID = existingApp.id
      }
    }

    const manifestTitle = bundle.manifest?.title

    if (appID === null) {
      const appName = this.makeDeploymentName(manifestTitle, resolvedAppPath)

      debugLog(() => [
        'Deployer: creating new app with',
        `name=${appName} from`,
        `title=${JSON.stringify(manifestTitle)},`,
        `path=${resolvedAppPath}}`
      ].join(' '))

      app = await this.client.createApp(appName)
      appID = app.id
      reassignTitle = true
    } else {
      debugLog(() => `Deployer: getting existing app with id=${(appID as number).toString()}`)

      app = await this.client.getApp(appID)
    }

    if (app == null) {
      return await Promise.reject(new Error('unable to find or create app'))
    }

    if (!app.vanityUrl && resolvedAppPath !== '') {
      debugLog(() => `Deployer: updating vanity URL for app=${(appID as number).toString()} to path=${resolvedAppPath}`)

      await this.client.updateAppVanityURL(appID, resolvedAppPath)
    }

    if (manifestTitle !== undefined && manifestTitle !== null && reassignTitle) {
      app.title = manifestTitle
      await this.client.updateApp(appID, { title: app.title })
    }

    debugLog(() => `Deployer: uploading bundle for app=${(appID as number).toString()} tarball=${bundle.tarballPath}`)

    const uploadedBundle = await this.client.uploadApp(appID, bundle)

    debugLog(() => `Deployer: deploying app=${(appID as number).toString()} bundle=${uploadedBundle.id}`)

    return await this.client.deployApp(appID, uploadedBundle.id)
      .then((ct: ClientTaskResponse) => {
        const taskApp = (app as Application)
        return {
          taskId: ct.id,
          appId: taskApp.id,
          appGuid: taskApp.guid,
          appUrl: taskApp.url,
          title: (
            taskApp.title !== undefined && taskApp.title !== null
              ? taskApp.title
              : ''
          )
        }
      })
  }

  private async findExistingApp (appPath: string): Promise<Application | null> {
    let found: Application|null = null
    const pager = new ListApplicationsPager(this.client)
    for await (const app of pager.listApplications()) {
      const currentAppPath = new URL(app.url).pathname
      if (currentAppPath === appPath) {
        found = app
        break
      }
    }
    return found
  }

  private makeDeploymentName (title?: string | null, appPath?: string): string {
    let name = ''
    if ((title === null || title === undefined) || (appPath === null || appPath === undefined)) {
      name = 'unnamed ' + crypto.randomBytes(15).toString('base64')
    }

    if (appPath !== null && appPath !== undefined) {
      name = [appPath, name].join('/')
    }

    name = name.toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^A-Za-z0-9_ -]+/g, '')
      .replace(/_+/g, '_')
      .substring(0, 64)

    if (name.length < 3) {
      for (let i = name.length; i < 3; i++) {
        name += '_'
      }
    }

    return name
  }
}

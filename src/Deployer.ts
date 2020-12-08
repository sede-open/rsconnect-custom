import crypto from 'crypto'
import { URL } from 'url'

import { pathInSlashes } from './conversions'
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

  public async deployManifest (manifestPath: string, appPath?: string, force?: boolean): Promise<DeployTaskResponse> {
    return await this.deployBundle(await this.bundler.fromManifest(manifestPath), appPath, force)
  }

  public async deployBundle (bundle: Bundle, appPath?: string, force?: boolean): Promise<DeployTaskResponse> {
    const resolvedAppPath = this.pather.resolve(bundle.manifestPath, appPath)

    debugLog(() => [
      'Deployer: initial app path resolution',
      `resolved=${JSON.stringify(resolvedAppPath)}`,
      `orig=${JSON.stringify(appPath)}`
    ].join(' '))

    let appID: number | null = null
    let app: Application | null = null
    let reassignTitle = false
    let existingBundleSize: number | null = null
    let existingBundleSha1: string | null = null

    if (resolvedAppPath !== '') {
      // TODO: use an API that doesn't require scanning all applications, if possible
      const existingApp = await this.findExistingApp(resolvedAppPath)
      if (existingApp !== null) {
        debugLog(() => [
          'Deployer: found existing',
          `app=${JSON.stringify(existingApp.id)}`,
          'at',
          `path=${JSON.stringify(resolvedAppPath)}`
        ].join(' '))

        app = existingApp
        appID = existingApp.id

        if (existingApp.bundleId !== null && existingApp.bundleId !== undefined) {
          const existingBundle = await this.client.getBundle(existingApp.bundleId)

          if (existingBundle.size !== null && existingBundle.size !== undefined) {
            existingBundleSize = existingBundle.size
          } else {
            debugLog(() => [
              'Deployer: existing app',
              `bundle=${JSON.stringify(existingApp.bundleId)}`,
              'missing size'
            ].join(' '))
          }

          if (existingBundle.metadata !== null && existingBundle.metadata !== undefined) {
            existingBundleSha1 = existingBundle.metadata.sha1
          } else {
            debugLog(() => [
              'Deployer: existing app',
              `bundle=${JSON.stringify(existingApp.bundleId)}`,
              'missing sha1'
            ].join(' '))
          }
        }
      }
    }

    const bundleSize = bundle.size()
    const bundleSha1 = bundle.sha1()

    if (
      app !== null &&
      this.bundleMatchesCurrent(
        bundleSize,
        bundleSha1,
        existingBundleSize,
        existingBundleSha1
      ) &&
      force !== true
    ) {
      debugLog(() => [
        'Deployer: local bundle',
        `size=${JSON.stringify(bundleSize)}`,
        'or',
        `sha1=${JSON.stringify(bundleSha1)}`,
        'matches existing',
        `bundle=${JSON.stringify(app?.bundleId)}`,
        `and force=${JSON.stringify(force)},`,
        'so returning no-op deploy result'
      ].join(' '))

      return {
        taskId: '',
        appId: app.id,
        appGuid: app.guid,
        appUrl: app.url,
        title: (
          app.title !== undefined && app.title !== null
            ? app.title
            : ''
        ),
        noOp: true
      }
    }

    const manifestTitle = bundle.manifest?.title

    if (appID === null) {
      const appName = this.makeDeploymentName(manifestTitle, resolvedAppPath)

      debugLog(() => [
        'Deployer: creating new app with',
        `name=${JSON.stringify(appName)}`,
        'from',
        `title=${JSON.stringify(manifestTitle)},`,
        `path=${JSON.stringify(resolvedAppPath)}}`
      ].join(' '))

      app = await this.client.createApp(appName)

      debugLog(() => [
        'Deployer: new app created with',
        `id=${JSON.stringify(app?.id)}`
      ].join(' '))

      appID = app.id
      reassignTitle = true
    } else {
      debugLog(() => [
        'Deployer: getting existing app with',
        `id=${JSON.stringify(appID)}`
      ].join(' '))

      app = await this.client.getApp(appID)
    }

    if (app == null) {
      return await Promise.reject(new Error('unable to find or create app'))
    }

    if (!app.vanityUrl && resolvedAppPath !== '') {
      debugLog(() => [
        'Deployer: updating vanity URL for',
        `app=${JSON.stringify(appID)}`,
        'to',
        `path=${JSON.stringify(resolvedAppPath)}`
      ].join(' '))

      await this.client.updateAppVanityURL(appID, resolvedAppPath)
    }

    if (manifestTitle !== undefined && manifestTitle !== null && reassignTitle) {
      app.title = manifestTitle
      await this.client.updateApp(appID, { title: app.title })
    }

    debugLog(() => [
      'Deployer: uploading bundle for',
      `app=${JSON.stringify(appID)}`,
      `tarball=${JSON.stringify(bundle.tarballPath)}`
    ].join(' '))

    const uploadedBundle = await this.client.uploadApp(appID, bundle)

    debugLog(() => [
      'Deployer: deploying',
      `app=${JSON.stringify(appID)}`,
      `bundle=${JSON.stringify(uploadedBundle.id)}`
    ].join(' '))

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
          ),
          noOp: false
        }
      })
  }

  private bundleMatchesCurrent (
    bundleSize: number,
    bundleSha1: string,
    existingSize: number | null,
    existingSha1: string | null
  ): boolean {
    return (
      (existingSize !== null && bundleSize === existingSize) ||
      (existingSha1 !== null && bundleSha1 === existingSha1)
    )
  }

  private async findExistingApp (appPath: string): Promise<Application | null> {
    let found: Application|null = null

    const matchingPath = pathInSlashes([
      this.client.clientPathname,
      appPath
    ])

    const pager = new ListApplicationsPager(this.client)
    for await (const app of pager.listApplications()) {
      const currentAppPath = pathInSlashes([new URL(app.url).pathname])

      if (currentAppPath === matchingPath) {
        found = app

        debugLog(() => [
          'Deployer: found matching app at',
          `path=${JSON.stringify(currentAppPath)}`
        ].join(' '))

        break
      }

      debugLog(() => [
        'Deployer: skipping mismatched',
        `currentAppPath=${JSON.stringify(currentAppPath)}`,
        'for search',
        `appPath=${JSON.stringify(matchingPath)}`
      ].join(' '))
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

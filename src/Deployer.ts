import crypto from 'crypto'
import { URL } from 'url'
import { AxiosError } from 'axios'

import { pathInSlashes } from './conversions'
import { debugLog } from './debugLog'
import { APIClient } from './APIClient'
import { Bundle } from './Bundle'
import { Bundler } from './Bundler'
import { Application, ClientTaskResponse, ListApplicationsResponse } from './api-types'
import { ListApplicationsPager } from './ListApplicationsPager'
import { ApplicationPather } from './ApplicationPather'

export interface DeployManifestParams {
  accessType?: string
  appIdentifier?: string
  force?: boolean
  manifestPath: string
  requireVanityPath?: boolean
}

export interface DeployBundleParams {
  accessType?: string
  appIdentifier?: string
  bundle: Bundle
  force?: boolean
  requireVanityPath?: boolean
}

export interface DeployTaskResponse {
  appGuid: string
  appId: number
  appName: string
  appUrl: string
  noOp: boolean
  taskId: string
  title: string
}

const APIErrorDuplicateName = 26

export class Deployer {
  private readonly client: APIClient
  private readonly bundler: Bundler
  private readonly pather: ApplicationPather

  constructor (client: APIClient) {
    this.client = client
    this.bundler = new Bundler()
    this.pather = new ApplicationPather()
  }

  public async deployManifest ({
    accessType,
    appIdentifier,
    force,
    manifestPath,
    requireVanityPath
  }: DeployManifestParams): Promise<DeployTaskResponse> {
    return await this.deployBundle({
      accessType,
      appIdentifier,
      bundle: await this.bundler.fromManifest(manifestPath),
      force,
      requireVanityPath
    })
  }

  public async deployBundle ({
    accessType,
    appIdentifier,
    bundle,
    force,
    requireVanityPath
  }: DeployBundleParams): Promise<DeployTaskResponse> {
    const resolvedAppPath = this.pather.resolve(appIdentifier, bundle.manifestPath)
    const resolvedAppName = this.makeDeploymentName(appIdentifier, resolvedAppPath)

    debugLog(() => [
      'Deployer: initial app resolution',
      `resolvedAppPath=${JSON.stringify(resolvedAppPath)}`,
      `resolvedAppName=${JSON.stringify(resolvedAppName)}`,
      `appIdentifier=${JSON.stringify(appIdentifier)}`
    ].join(' '))

    const reassignTitle = false
    let existingBundleSize: number | null = null
    let existingBundleSha1: string | null = null

    const app = await this.findOrCreateByName(resolvedAppName)

    if (app.bundleId !== null && app.bundleId !== undefined) {
      const existingBundle = await this.client.getBundle(app.bundleId)

      if (existingBundle.size !== null && existingBundle.size !== undefined) {
        existingBundleSize = existingBundle.size
      } else {
        debugLog(() => [
          'Deployer: existing app',
          `bundle=${JSON.stringify(app.bundleId)}`,
          'missing size'
        ].join(' '))
      }

      if (existingBundle.metadata !== null && existingBundle.metadata !== undefined) {
        existingBundleSha1 = existingBundle.metadata.BundleArchiveSHA1
      } else {
        debugLog(() => [
          'Deployer: existing app',
          `bundle=${JSON.stringify(app.bundleId)}`,
          'missing sha1'
        ].join(' '))
      }
    }

    const bundleSize = bundle.size()
    const bundleSha1 = bundle.sha1()

    if (
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
        appGuid: app.guid,
        appId: app.id,
        appName: app.name,
        appUrl: app.url,
        noOp: true,
        taskId: '',
        title: (
          app.title !== undefined && app.title !== null
            ? app.title
            : ''
        )
      }
    }

    if (!app.vanityUrl && resolvedAppPath !== '') {
      debugLog(() => [
        'Deployer: attempting to update vanity URL for',
        `app=${JSON.stringify(app.id)}`,
        'to',
        `path=${JSON.stringify(resolvedAppPath)}`
      ].join(' '))

      await this.client.updateAppVanityURL(app.id, resolvedAppPath)
        .catch((err: any) => {
          debugLog(() => [
            'Deployer: failed to update vanity URL for',
          `app=${JSON.stringify(app.id)}`
          ].join(' '))

          if (requireVanityPath === true) {
            throw err
          }
        })
    }

    const appUpdates: any = {}
    const manifestTitle = bundle.manifest?.title

    if (manifestTitle !== undefined && manifestTitle !== null && reassignTitle) {
      app.title = manifestTitle
      appUpdates.title = app.title
    }

    if (accessType !== undefined && accessType !== null) {
      app.accessType = accessType
      appUpdates.access_type = accessType
    }

    if (Object.keys(appUpdates).length !== 0) {
      debugLog(() => [
        'Deployer: updating',
        `app=${JSON.stringify(app.id)}`,
        `with=${JSON.stringify(appUpdates)}`
      ].join(' '))
      await this.client.updateApp(app.id, appUpdates)
    }

    debugLog(() => [
      'Deployer: uploading bundle for',
      `app=${JSON.stringify(app.id)}`,
      `tarball=${JSON.stringify(bundle.tarballPath)}`
    ].join(' '))

    const uploadedBundle = await this.client.uploadApp(app.id, bundle)

    debugLog(() => [
      'Deployer: deploying',
      `app=${JSON.stringify(app.id)}`,
      `bundle=${JSON.stringify(uploadedBundle.id)}`
    ].join(' '))

    return await this.client.deployApp(app.id, uploadedBundle.id)
      .then((ct: ClientTaskResponse) => {
        return {
          appGuid: app.guid,
          appId: app.id,
          appName: app.name,
          appUrl: app.url,
          noOp: false,
          taskId: ct.id,
          title: (
            app.title !== undefined && app.title !== null
              ? app.title
              : ''
          )
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

  private async findOrCreateByName (name: string): Promise<Application> {
    if (name.length === 36 && name.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/) !== null) {
      debugLog(() => [
        'Deployer: treating',
        `name=${JSON.stringify(name)}`,
        'as a GUID'
      ].join(' '))

      return await this.client.getApp(name)
    }

    return await this.client.createApp(name)
      .then((app: Application): Application => app)
      .catch(async (err: AxiosError): Promise<Application> => {
        if (err.response?.status !== 409) {
          debugLog(() => [
            'Deployer: received an unexpected error response during app',
            'creation with',
            `name=${JSON.stringify(name)}`,
            `data=${JSON.stringify(err.response?.data)}`
          ].join(' '))
          throw err
        }

        const errCode = err.response?.data?.code
        if (errCode !== APIErrorDuplicateName) {
          debugLog(() => [
            'Deployer: received an unexpected conflict error during app',
            'creation with',
            `name=${JSON.stringify(name)}`,
            `data=${JSON.stringify(err.response?.data)}`
          ].join(' '))
          throw err
        }

        return this.findExistingAppByName(name)
      })
  }

  private async findExistingAppByName (name: string): Promise<Application> {
    return await this.client.listApplications({ count: 1, filter: [`name:${name}`] })
      .then((resp: ListApplicationsResponse): Application => {
        if (resp.applications.length < 1) {
          debugLog(() => [
            'Deployer: failed to find application with',
            `name=${JSON.stringify(name)}`
          ].join(' '))
          throw new Error(`no application with name=${JSON.stringify(name)}`)
        }
        return resp.applications[0]
      })
  }

  private async findExistingApp ({
    name,
    guid,
    path
  }: {
    name: string
    guid: string
    path: string
  }): Promise<Application | null> {
    let found: Application|null = null

    if (guid !== '') {
      found = await this.findExistingAppByGuid(guid)
    }

    if (found === null && (name !== '' || path !== '')) {
      found = await this.findExistingAppByNameOrPath(name, path)
    }

    return found
  }

  private async findExistingAppByGuid (guid: string): Promise<Application | null> {
    return await this.client.getApp(guid)
      .then((found: Application): Application => found)
      .catch((err: any): null => {
        debugLog(() => [
          'Deployer: no app found with',
          `guid=${guid}`,
          `err=${JSON.stringify(err)}`
        ].join(' '))
        return null
      })
  }

  private async findExistingAppByNameOrPath (name: string, path: string): Promise<Application | null> {
    let found: Application | null = null

    const matchingPath = pathInSlashes([
      this.client.clientPathname,
      path
    ])

    const pager = new ListApplicationsPager(this.client)
    for await (const app of pager.listApplications()) {
      const currentAppPath = pathInSlashes([new URL(app.url).pathname])

      if (app.name === name) {
        found = app

        debugLog(() => [
          'Deployer: found matching app with',
          `name=${JSON.stringify(app.name)}`
        ].join(' '))

        break
      }

      if (currentAppPath === matchingPath) {
        found = app

        debugLog(() => [
          'Deployer: found matching app with',
          `path=${JSON.stringify(currentAppPath)}`
        ].join(' '))

        break
      }

      debugLog(() => [
        'Deployer: skipping mismatched',
        `currentAppPath=${JSON.stringify(currentAppPath)}`,
        `currentAppName=${JSON.stringify(app.name)}`,
        'for search',
        `matchingPath=${JSON.stringify(matchingPath)}`,
        `matchingName=${JSON.stringify(name)}`
      ].join(' '))
    }
    return found
  }

  private makeDeploymentName (appIdentifier?: string | null, appPath?: string | null): string {
    let name = ''

    if (appIdentifier !== null && appIdentifier !== undefined) {
      if (!appIdentifier.includes('/') && appIdentifier.length > 2) {
        return appIdentifier
      } else if (appIdentifier.length < 3) {
        name = appIdentifier
      }
    } else {
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

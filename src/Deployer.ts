import path from "path"
import crypto from "crypto"
import { URL } from "url"

import { APIClient } from "./APIClient"
import { Application } from "./Application"
import { Bundle } from "./Bundle"
import { Bundler } from "./Bundler"
import { ClientTaskResponse } from "./ClientTaskResponse"
import { DeployTaskResponse } from "./DeployTaskResponse"
import { ListApplicationsPager } from "./ListApplicationsPager"
import { MiniGit } from "./MiniGit"

export class Deployer {
    private client: APIClient
    private bundler: Bundler
    private git: MiniGit

    constructor(client: APIClient) {
        this.client = client
        this.bundler = new Bundler()
        this.git = new MiniGit()
    }

    public async deployManifest(manifestPath: string, appPath?: string): Promise<DeployTaskResponse> {
        return this.deployBundle(await this.bundler.fromManifest(manifestPath), appPath)
    }

    public async deployBundle(bundle: Bundle, appPath?: string): Promise<DeployTaskResponse> {
        let resolvedAppPath = this.resolveAppPath(bundle.manifestPath, appPath)
        let appID: number | null = null
        let app: Application | null = null
        let reassignTitle = false

        if (resolvedAppPath !== "") {
            // TODO: use an API that doesn't require scanning all applications, if possible
            const existingApp = await this.findExistingApp(resolvedAppPath)
            if (existingApp !== null) {
                appID = existingApp.id
            }
        }

        const manifestTitle = bundle.manifest?.title

        if (appID === null) {
            const appName = this.makeDeploymentName(manifestTitle || resolvedAppPath)
            app = await this.client.createApp(appName)
            appID = app.id
            reassignTitle = true
        } else {
            app = await this.client.getApp(appID)
        }

        if (app == null) {
            return Promise.reject("unable to find or create app")
        }

        if (!app.vanityUrl && resolvedAppPath !== "") {
            await this.client.updateAppVanityURL(appID, resolvedAppPath)
        }

        if (manifestTitle !== undefined && manifestTitle !== null && reassignTitle) {
            app.title = manifestTitle
            await this.client.updateApp(appID, { title: app.title })
        }

        const uploadedBundle = await this.client.uploadApp(appID, bundle)
        return this.client.deployApp(appID, uploadedBundle.id)
            .then((ct: ClientTaskResponse) => {
                const taskApp = (app as Application)
                return {
                    taskId: ct.id,
                    appId: taskApp.id,
                    appGuid: taskApp.guid,
                    appUrl: taskApp.url,
                    title: taskApp.title || ''
                }
            })
    }

    private async findExistingApp(appPath: string): Promise<Application | null> {
        let found: Application|null = null;
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

    private resolveAppPath(manifestPath?: string, appPath?: string): string {
        if (appPath) {
            return this.strictAppPath(appPath as string)
        }
        if (!manifestPath) {
            return ""
        }
        const gitTopLevel = this.git.showTopLevel()
        if (gitTopLevel === null) {
            return this.strictAppPath(path.basename(path.dirname(manifestPath)))
        }
        const relPath = path.dirname(manifestPath).replace(gitTopLevel, "")
        return this.strictAppPath(relPath)
    }

    private strictAppPath(appPath: string): string {
        return (
            '/' +
            appPath.trim().replace(/${path.sep}/g, "/") +
            '/'
        ).replace(/\/\//g, '/').replace(/_+/, '_')
    }

    private makeDeploymentName(title?: string): string {
        if (!title) {
            title = 'unnamed ' + crypto.randomBytes(15).toString('base64')
        }

        let name = title.toLowerCase().replace(/ /g, "_")
        name = name.replace(/[^A-Za-z0-9_ -]+/g, "")
        name = name.replace(/_+/g, "_")
        name = name.substring(0, 64)

        if (name.length < 3) {
            for (let i = name.length; i < 3; i++) {
                name += '_'
            }
        }

        return name
    }
}

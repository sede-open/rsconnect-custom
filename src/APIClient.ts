import path from "path"
import axios, { AxiosInstance, AxiosResponse } from "axios"

import { APIClientConfiguration } from "./APIClientConfiguration"
import { Bundle } from "./Bundle"
import { Bundler } from "./Bundler"
import { MiniGit } from "./MiniGit"

export class APIClient {
    private cfg: APIClientConfiguration
    private client: AxiosInstance
    private bundler: Bundler
    private git: MiniGit

    constructor(cfg: APIClientConfiguration) {
        this.cfg = cfg
        this.client = axios.create({
            baseURL: this.cfg.baseURL,
            headers: {
                Authorization: `Key ${this.cfg.apiKey}`
            }
        })
        this.bundler = new Bundler()
        this.git = new MiniGit()
    }

    public async deployManifest(manifestPath: string, appPath?: string): Promise<AxiosResponse> {
        return this.deployBundle(await this.bundler.fromManifest(manifestPath), appPath)
    }

    public async deployBundle(bundle: Bundle, appPath?: string): Promise<AxiosResponse> {
        let resolvedAppPath = this.resolveAppPath(bundle.manifestPath, appPath)
        let appID: string | null = null
        if (resolvedAppPath !== "") {
            // TODO: find existing app at this path and assign the app ID
        }

        if (appID !== null) {
            // TODO: deploy to the existing app
        } else {
            // TODO: deploy as a new app
        }

        return this.client.get("__healthcheck__", { data: { resolvedAppPath }})
    }

    public async serverSettings(sub?: string | undefined): Promise<AxiosResponse> {
        let path = 'server_settings'
        if (sub !== undefined) {
            if (['python', 'r'].includes(sub)) {
                path = `v1/server_settings/${sub}`
            } else {
                path = `server_settings/${sub}`
            }
        }
        return this.client.get(path)
    }

    private resolveAppPath(manifestPath?: string, appPath?: string): string {
        if (appPath) {
            return appPath as string
        }
        if (!manifestPath) {
            return ""
        }
        const gitTopLevel = this.git.showTopLevel()
        if (gitTopLevel === null) {
            return ""
        }
        const relPath = path.dirname(manifestPath).replace(gitTopLevel, "")
        return relPath.trim().replace(/^${path.sep}*/, "")
    }
}
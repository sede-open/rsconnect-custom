import axios, { AxiosInstance, AxiosResponse } from "axios"
import fs from "fs"

import { APIClientConfiguration } from "./APIClientConfiguration"
import { Application } from "./Application"
import { Bundle } from "./Bundle"
import { ClientTaskResponse } from "./ClientTaskResponse"
import { snake2camel } from "./conversions"
import { ExtendedBundleResponse } from "./ExtendedBundleResponse"
import { ListApplicationsParams } from "./ListApplicationParams"
import { ListApplicationsResponse } from "./ListApplicationsResponse"
import { VanityRecordResponse } from "./VanityRecordResponse"

export class APIClient {
    public cfg: APIClientConfiguration
    private client: AxiosInstance

    constructor(cfg: APIClientConfiguration) {
        this.cfg = cfg
        this.client = axios.create({
            baseURL: this.cfg.baseURL,
            headers: {
                Authorization: `Key ${this.cfg.apiKey}`
            }
        })
    }

    public async createApp(appName: string): Promise<Application> {
        return this.client.post('applications', { name: appName })
            .then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async getApp(appID: number): Promise<Application> {
        return this.client.get(`applications/${appID}`)
            .then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async updateApp(appID: number, updates: any): Promise<Application> {
        return this.client.post(`applications/${appID}`, updates)
            .then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async updateAppVanityURL(appID: number, vanityURL: string): Promise<VanityRecordResponse> {
        return this.client.post(
            `applications/${appID}/vanities`,
            { 'app_id': appID, 'path_prefix': vanityURL }
        ).then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async uploadApp(appID: number, bundle: Bundle): Promise<ExtendedBundleResponse> {
        return this.client.post(
            `applications/${appID}/upload`,
            fs.createReadStream(bundle.tarballPath)
        ).then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async deployApp(appID: number, bundleID: number): Promise<ClientTaskResponse> {
        return this.client.post(
            `applications/${appID}/deploy`,
            { bundle: bundleID } 
        ).then((resp: AxiosResponse) => snake2camel(resp.data))
    }

    public async listApplications(params?: ListApplicationsParams): Promise<ListApplicationsResponse> {
        return this.client.get('applications', { params })
            .then((resp: AxiosResponse) => {
                const data = resp.data
                const { applications, count, total, continuation } = data;
                return {
                    applications: applications.map(snake2camel),
                    count,
                    total,
                    continuation
                }
            })
    }

    public async getTask(taskId: string, status?: number): Promise<ClientTaskResponse> {
        return this.client.get(
            `tasks/${taskId}`,
            status
                ? { params: { 'first_status': status } }
                : undefined
        ).then((resp: AxiosResponse) => snake2camel(resp.data))
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
}
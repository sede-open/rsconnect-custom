import axios, { AxiosInstance, AxiosResponse } from "axios"

export class APIClient {
    private cfg: APIClientConfiguration
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

export class APIClientConfiguration {
    public baseURL: string
    public apiKey: string

    constructor(cfgParams: APIClientConfigurationParams) {
        this.baseURL = cfgParams.baseURL
        this.apiKey = cfgParams.apiKey
    }
}

export interface APIClientConfigurationParams {
    baseURL: string
    apiKey: string
}

export * as gen from "./gen"
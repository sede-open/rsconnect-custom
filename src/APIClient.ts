import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import fs from 'fs'

import { debugLog, debugEnabled } from './debugLog'
import {
  Application,
  ClientTaskResponse,
  ExtendedBundleResponse,
  ListApplicationsParams,
  ListApplicationsResponse,
  VanityRecordResponse
} from './api-types'
import { Bundle } from './Bundle'
import { keysToCamel } from './conversions'

export interface APIClientConfiguration {
  baseURL: string
  apiKey: string
}

export class APIClient {
  public cfg: APIClientConfiguration
  private readonly client: AxiosInstance

  constructor (cfg: APIClientConfiguration) {
    this.cfg = cfg
    this.client = axios.create({
      baseURL: this.cfg.baseURL,
      headers: {
        Authorization: `Key ${this.cfg.apiKey}`
      }
    })
    if (debugEnabled) {
      this.client.interceptors.request.use((r: AxiosRequestConfig): AxiosRequestConfig => {
        debugLog(() => [
          'APIClient: request',
          r.method?.toUpperCase(),
          JSON.stringify(r.url),
          `params=${JSON.stringify(r.params)}`,
          `headers=${JSON.stringify(r.headers)}`
        ].join(' '))
        return r
      })

      this.client.interceptors.response.use((r: AxiosResponse): AxiosResponse => {
        debugLog(() => [
          'APIClient: response',
          `status=${r.status}`,
          `headers=${JSON.stringify(r.headers)}`
        ].join(' '))
        return r
      })
    }
  }

  public get clientPathname (): string {
    return new URL(this.cfg.baseURL).pathname.replace('/__api__', '')
  }

  public async createApp (appName: string): Promise<Application> {
    return await this.client.post('applications', { name: appName })
      .then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async getApp (appID: number): Promise<Application> {
    return await this.client.get(`applications/${appID}`)
      .then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async updateApp (appID: number, updates: any): Promise<Application> {
    return await this.client.post(`applications/${appID}`, updates)
      .then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async updateAppVanityURL (appID: number, vanityURL: string): Promise<VanityRecordResponse> {
    return await this.client.post(
            `applications/${appID}/vanities`,
            { app_id: appID, path_prefix: vanityURL }
    ).then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async uploadApp (appID: number, bundle: Bundle): Promise<ExtendedBundleResponse> {
    return await this.client.post(
            `applications/${appID}/upload`,
            fs.createReadStream(bundle.tarballPath)
    ).then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async deployApp (appID: number, bundleID: number): Promise<ClientTaskResponse> {
    return await this.client.post(
            `applications/${appID}/deploy`,
            { bundle: bundleID }
    ).then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async listApplications (params?: ListApplicationsParams): Promise<ListApplicationsResponse> {
    return await this.client.get('applications', { params })
      .then((resp: AxiosResponse) => {
        const data = resp.data
        const { applications, count, total, continuation } = data
        return {
          applications: applications.map(keysToCamel),
          count,
          total,
          continuation
        }
      })
  }

  public async getTask (taskId: string, status?: number): Promise<ClientTaskResponse> {
    return await this.client.get(
            `tasks/${taskId}`,
            status !== null && status !== undefined
              ? { params: { first_status: status } }
              : undefined
    ).then((resp: AxiosResponse) => keysToCamel(resp.data))
  }

  public async serverSettings (sub?: string | undefined): Promise<AxiosResponse> {
    let path = 'server_settings'
    if (sub !== undefined) {
      if (['python', 'r'].includes(sub)) {
        path = `v1/server_settings/${sub}`
      } else {
        path = `server_settings/${sub}`
      }
    }
    return await this.client.get(path)
  }
}

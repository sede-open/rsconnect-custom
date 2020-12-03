import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as rsconnect from '../src/main'

const SEED_ADMIN_GEN_CONFIG = new rsconnect.gen.Configuration({
  apiKey: 'Key f1wc3w4090uv67yhud7j08zjzgvt7yfg',
  basePath: 'http://127.0.0.1:23939/__api__'
})

const SEED_ADMIN_CONFIG = new rsconnect.APIClientConfiguration({
  apiKey: 'f1wc3w4090uv67yhud7j08zjzgvt7yfg',
  baseURL: 'http://127.0.0.1:23939/__api__'
})

axios.interceptors.request.use((request: AxiosRequestConfig): AxiosRequestConfig => {
  if (process.env.DEBUG !== 'enabled') {
    return request
  }
  console.log('---> outgoing request headers: %o', request.headers)
  if (request.data) {
    console.log('---> outgoing request data: %o', request.data)
  }
  return request
})

axios.interceptors.response.use((response: AxiosResponse): AxiosResponse<any>  => {
  if (process.env.DEBUG !== 'enabled') {
    return response
  }
  console.log('---> incoming response status: %o', response.status)
  console.log('---> incoming response headers: %o', response.headers)
  console.log('---> incoming response data: %o', response.data)
  return response
})

describe('rsconnect.gen', () => {
  beforeAll(async () => {
    return axios.get(SEED_ADMIN_GEN_CONFIG.basePath + '/server_settings')
    .then((response: any) => {
      expect(response.status).toBe(200)
    })
  })

  describe('audit logs API', () => {
    it('getAuditLogs', async () => {
      return new rsconnect.gen.AuditLogsApi(SEED_ADMIN_GEN_CONFIG)
        .getAuditLogs()
        .then((response: any) => {
          expect(response).not.toBe(null)
          expect(response.data).not.toBe(null)
          expect(response.data.results).not.toBe(null)
          expect(response.data.results.length).not.toBe(0)
        })
    })
  })
})

describe('rsconnect', () => {
  describe('server settings API', () => {
    it('serverSettings', async () => {
      const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
      return client.serverSettings()
        .then((response: AxiosResponse): void => {
          expect(response.status).toBe(200)
        })
    })

    const subSettings = ['r', 'python', 'mail', 'scheduler']

    subSettings.forEach((sub: string) => {
      it(`serverSettings("${sub}")`, async () => {
        const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
        return client.serverSettings(sub)
          .then((response: AxiosResponse): void => {
            expect(response.status).toBe(200)
          })
      })
    })
  })
})
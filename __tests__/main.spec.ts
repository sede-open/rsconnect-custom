import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { execSync } from "child_process"
import path from "path"
import { ListApplicationsResponse } from '../src/ListApplicationsResponse'

import * as rsconnect from '../src/main'

const SEED_ADMIN_GEN_CONFIG = new rsconnect.gen.Configuration({
  apiKey: 'Key f1wc3w4090uv67yhud7j08zjzgvt7yfg',
  basePath: 'http://127.0.0.1:23939/__api__'
})

const SEED_ADMIN_CONFIG: rsconnect.APIClientConfiguration = {
  apiKey: 'f1wc3w4090uv67yhud7j08zjzgvt7yfg',
  baseURL: 'http://127.0.0.1:23939/__api__'
}

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
          expect(response).not.toBeNull()
          expect(response.data).not.toBeNull()
          expect(response.data.results).not.toBeNull()
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

  describe('applications API', () => {
    it('listApplications', async () => {
      const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
      return client.listApplications()
        .then((resp: ListApplicationsResponse) => {
          expect(resp.count).not.toBeNull()
          expect(resp.total).not.toBeNull()
          expect(resp.continuation).not.toBeNull()
        })
    })

    describe('ListApplicationsPager', () => {
      it('listApplications', async () => {
        const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
        const pager = new rsconnect.ListApplicationsPager(client)
        const appGen = pager.listApplications()
        // TODO: seed some applications so that this will iterate
        for await (const app of appGen) {
          expect(app).not.toBeNull()
        }
      })
    })
  })

  describe('deploy API', () => {
    it.skip('TODO deployManifest', async () => {
      const top = execSync("git rev-parse --show-toplevel").toString().trim()
      const plumberManifest = path.join(top, "__tests__/apps/plumber/manifest.json")
      const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
      return client.deployManifest(plumberManifest, "/fancy/plumber")
        .then((resp: AxiosResponse) => {
          expect(resp.status).toBe(200)
        })
    })
  })
})
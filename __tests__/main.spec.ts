import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { execSync } from "child_process"
import path from "path"
import { DeployTaskResponse } from '../src/DeployTaskResponse'
import { ListApplicationsResponse } from '../src/ListApplicationsResponse'

import * as rsconnect from '../src/main'

jest.setTimeout(60000)

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
    describe('Deployer + ClientTaskPoller', () => {
      it('deployManifest', async () => {
        const top = execSync("git rev-parse --show-toplevel").toString().trim()
        const plumberManifest = path.join(top, "__tests__/apps/plumber/manifest.json")
        const client = new rsconnect.APIClient(SEED_ADMIN_CONFIG)
        const deployer = new rsconnect.Deployer(client)
        return deployer.deployManifest(plumberManifest, "/fancy/plumber")
          .then((resp: DeployTaskResponse) => {
            expect(resp.taskId).not.toBeNull()
            return new rsconnect.ClientTaskPoller(client, resp.taskId)
          })
          .then(async (poller: rsconnect.ClientTaskPoller) => {
            for await (const result of poller.poll()) {
              expect(result).not.toBeNull()
              expect(result.status).not.toBeNull()
              expect(result.status.length).toBeGreaterThan(-1)
            }
          })
          .catch((err: any) => {
            console.trace(err)
          })
      })
    })
  })
})
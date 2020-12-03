import axios from 'axios'
import * as rsconnect from '../src/main'

const SEED_ADMIN_CONFIG = new rsconnect.Configuration({
  apiKey: 'Key f1wc3w4090uv67yhud7j08zjzgvt7yfg',
  basePath: 'http://127.0.0.1:23939/__api__'
})

describe('rsconnect', () => {
  beforeAll(async () => {
    return axios.get(SEED_ADMIN_CONFIG.basePath + '/server_settings')
    .then((response: any) => {
      expect(response.status).toBe(200)
    })
  })

  describe('audit logs API', () => {
    it('getAuditLogs', async () => {
      return new rsconnect.AuditLogsApi(SEED_ADMIN_CONFIG)
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

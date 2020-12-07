import { APIClient } from '../src/APIClient'

describe('APIClient', () => {
  describe('clientPathname', () => {
    const testCases = [
      {
        input: 'http://127.0.0.1:23939/__api__',
        output: ''
      },
      {
        input: 'http://127.0.0.1:23939/prefixed/__api__',
        output: '/prefixed'
      },
      {
        input: 'http://127.0.0.1:23939/prefixed/__api__?other=stuff',
        output: '/prefixed'
      },
      {
        input: 'http://goop:floop@127.0.0.1:23939/prefixed/__api__?other=stuff#more-stuff',
        output: '/prefixed'
      }
    ]

    testCases.forEach((tc) => {
      it(`returns ${JSON.stringify(tc.output)} from ${JSON.stringify(tc.input)}`, () => {
        const client = new APIClient({ baseURL: tc.input, apiKey: 'nonempty' })
        expect(client.clientPathname).toBe(tc.output)
      })
    })
  })
})

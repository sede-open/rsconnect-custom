import { keysToCamel, pathInSlashes } from '../src/conversions'

interface keysToCamelTestCase {
  input: any
  output: any
}

describe('keysToCamel', () => {
  const testCases: keysToCamelTestCase[] = [
    {
      input: undefined,
      output: undefined
    },
    {
      input: null,
      output: null
    },
    {
      input: 'aspiring_snek',
      output: 'aspiring_snek'
    },
    {
      input: 'camelInDisguise',
      output: 'camelInDisguise'
    },
    {
      input: ['many', 'camelsHave', 'manyHumps'],
      output: ['many', 'camelsHave', 'manyHumps']
    },
    {
      input: ['the_sneks', 'are_here', 'with_the_camels'],
      output: ['the_sneks', 'are_here', 'with_the_camels']
    },
    {
      input: {
        lower: {
          nested_snek: 'untouched_value'
        },
        snakey_key: {
          nestedCamel: 'untouched_value'
        }
      },
      output: {
        lower: {
          nestedSnek: 'untouched_value'
        },
        snakeyKey: {
          nestedCamel: 'untouched_value'
        }
      }
    }
  ]

  testCases.forEach((tc: keysToCamelTestCase) => {
    it(`converts ${JSON.stringify(tc.input)} to ${JSON.stringify(tc.output)}`, () => {
      expect(keysToCamel(tc.input)).toStrictEqual(tc.output)
    })
  })
})

interface pathInSlashesTestCase {
  input: string[]
  output: string
}

describe('pathInSlashes', () => {
  const testCases: pathInSlashesTestCase[] = [
    {
      input: ['dogs'],
      output: '/dogs/'
    },
    {
      input: ['cats/'],
      output: '/cats/'
    },
    {
      input: ['/hats'],
      output: '/hats/'
    },
    {
      input: ['/rsc', '/fancy/app'],
      output: '/rsc/fancy/app/'
    },
    {
      input: [],
      output: '/'
    },
    {
      input: ['/', '/too//many//////slashes/', '/'],
      output: '/too/many/slashes/'
    }
  ]

  testCases.forEach((tc: pathInSlashesTestCase) => {
    it(`converts ${JSON.stringify(tc.input)} to ${JSON.stringify(tc.output)}`, () => {
      expect(pathInSlashes(tc.input)).toBe(tc.output)
    })
  })
})

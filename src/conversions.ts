// ported from https://github.com/cape-io/lodash-humps {
import { transform, set } from 'lodash'
import { camelCase, isArray, isObjectLike, isPlainObject, map } from 'lodash/fp'

export const keysToCamel = function (obj: any): any {
  if (isArray(obj)) {
    return map(keysToCamel, obj)
  }
  if (isPlainObject(obj)) {
    return transform(obj, genIterKeysToCamel())
  }
  return obj
}

type keysToCamelCallback = (res: any, val: any, key: string) => any

const genIterKeysToCamel = function (): keysToCamelCallback {
  return (res: any, val: any, key: string): any => {
    set(
      res,
      camelCase(key),
      isObjectLike(val)
        ? keysToCamel(val)
        : val
    )
  }
}
// }

export const pathInSlashes = function (parts: string[]): string {
  if (parts.length === 0) {
    return '/'
  }

  let inSlashes = ['/']
    .concat(parts)
    .concat(['/'])
    .join('/')

  while (inSlashes.match(/\/\//) !== null) {
    inSlashes = inSlashes.replace('//', '/')
  }
  return inSlashes
}

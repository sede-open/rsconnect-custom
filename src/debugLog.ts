import util from 'util'

import { NoArgsReturnsString } from './function-types'

const logName = 'rsconnect-ts'

function debugMatchLogName (s: string): boolean {
  const re = new RegExp(`^${s.replace('*', '.*')}$`)
  return re.test(logName)
}

function getDebugEnabled (): boolean {
  if (process.env.NODE_DEBUG === undefined) {
    return false
  }
  const debugParts = process.env.NODE_DEBUG.split(/\s*,\s*/g)
  return debugParts.some(debugMatchLogName)
}

const rawDebugLog = util.debuglog(logName)

export const debugEnabled = getDebugEnabled()

export function debugLog (f: NoArgsReturnsString): void {
  if (!debugEnabled) {
    return
  }
  rawDebugLog(f())
}

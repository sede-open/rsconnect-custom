import {
  NoArgsReturnsStringMap,
  NoArgsReturnsNullString,
  StringReturnsNullString
} from './function-types'

export interface Git {
  configLocal: NoArgsReturnsStringMap
  currentBranch: NoArgsReturnsNullString
  remoteURL: NoArgsReturnsNullString
  showTopLevel: NoArgsReturnsNullString
  tryExec: StringReturnsNullString
}

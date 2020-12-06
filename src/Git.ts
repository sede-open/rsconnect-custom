import { NoArgsReturnsStringMap } from './NoArgsReturnsStringMap'
import { NoArgsReturnsNullString } from './NoArgsReturnsNullString'
import { StringReturnsNullString } from './StringReturnsNullString'

export interface Git {
  configLocal: NoArgsReturnsStringMap
  currentBranch: NoArgsReturnsNullString
  remoteURL: NoArgsReturnsNullString
  showTopLevel: NoArgsReturnsNullString
  tryExec: StringReturnsNullString
}

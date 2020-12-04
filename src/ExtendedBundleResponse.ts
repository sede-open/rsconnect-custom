export interface ExtendedBundleResponse {
  id: number
  appId: number
  createdTime: Date
  updatedTime: Date
  rVersion?: string
  pyVersion?: string
  buildStatus: number
  size?: number
  active: boolean
}

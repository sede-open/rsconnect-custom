import path from 'path'

import { debugLog } from './debugLog'
import { MiniGit } from './MiniGit'

export class ApplicationPather {
  private readonly git: MiniGit

  constructor () {
    this.git = new MiniGit()
  }

  public resolve (manifestPath?: string, appPath?: string): string {
    if (appPath !== null && appPath !== undefined) {
      debugLog(() => `ApplicationPather: returning non-empty app path=${appPath}`)
      return this.strictAppPath(appPath)
    }
    if (manifestPath === null || manifestPath === undefined) {
      debugLog(() => 'ApplicationPather: returning empty app path')
      return ''
    }
    const gitTopLevel = this.git.showTopLevel()
    if (gitTopLevel === null) {
      const gitLessPath = path.basename(path.dirname(manifestPath))
      debugLog(() => `ApplicationPather: returning without git prefix removed app path=${gitLessPath}`)
      return this.strictAppPath(gitLessPath)
    }
    const relPath = path.dirname(manifestPath).replace(gitTopLevel, '')
    debugLog(() => `ApplicationPather: returning relative to git top level=${gitTopLevel} path=${relPath}`)
    return this.strictAppPath(relPath)
  }

  private strictAppPath (appPath: string): string {
    return (
      '/' +
      appPath.trim().replace(/${path.sep}/g, '/') +
      '/'
    ).replace(/\.\//g, '/').replace(/\/\//g, '/').replace(/_+/, '_')
  }
}

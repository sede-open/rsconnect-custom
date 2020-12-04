import path from 'path'
import { MiniGit } from './MiniGit'

export class ApplicationPather {
  private readonly git: MiniGit

  constructor () {
    this.git = new MiniGit()
  }

  public resolve (manifestPath?: string, appPath?: string): string {
    if (appPath !== null && appPath !== undefined) {
      return this.strictAppPath(appPath)
    }
    if (manifestPath === null || manifestPath === undefined) {
      return ''
    }
    const gitTopLevel = this.git.showTopLevel()
    if (gitTopLevel === null) {
      return this.strictAppPath(path.basename(path.dirname(manifestPath)))
    }
    const relPath = path.dirname(manifestPath).replace(gitTopLevel, '')
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

import path from 'path'

import { debugLog } from './debugLog'
import { MiniGit } from './MiniGit'
import { Git } from './Git'

export class ApplicationPather {
  private readonly git: Git

  constructor (git?: Git) {
    this.git = (
      git !== undefined && git !== null
        ? git
        : new MiniGit()
    )
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

    let gitPrefix = ''
    const gitRemoteURL = this.git.remoteURL()
    if (gitRemoteURL === null) {
      const curGrandparentDir = path.resolve(process.cwd(), '../..')
      gitPrefix = path.dirname(path.dirname(manifestPath)).replace(curGrandparentDir, '')
    } else {
      gitPrefix = this.pathFromGitRemoteURL(gitRemoteURL)
    }

    const relPath = this.strictAppPath([
      gitPrefix,
      path.dirname(manifestPath).replace(gitTopLevel, '')
    ].join('/'))
    debugLog(() => `ApplicationPather: returning with git prefix=${gitPrefix} path=${relPath}`)
    return relPath
  }

  private strictAppPath (appPath: string): string {
    const inSlashes = (
      '/' +
      appPath.trim().replace(/${path.sep}/g, '/') +
      '/'
    )
    return inSlashes
      .replace(/\.\//g, '/')
      .replace(/ +/g, '_')
      .replace(/\./g, '_')
      .replace(/\/\//g, '/')
      .replace(/\/_+/, '/_')
  }

  private pathFromGitRemoteURL (gitRemoteURL: string): string {
    let rawURL = gitRemoteURL
    if (gitRemoteURL.match(new RegExp('[^/]+:[^/]+')) !== null) {
      rawURL = 'ssh://' + gitRemoteURL.replace(/:/, '/')
    }

    try {
      const parsedURL = new URL(rawURL)
      return this.sansScheme(this.sansTrailingGit([parsedURL.host, parsedURL.pathname].join('/')))
    } catch (err: any) {
      debugLog(() => `ApplicationPather: failed to parse raw git URL ${rawURL}`)
      return this.sansScheme(this.sansTrailingGit(rawURL))
    }
  }

  private sansTrailingGit (s: string): string {
    return s.replace(/\.git$/, '')
  }

  private sansScheme (s: string): string {
    return s.replace(/^[a-z]+:\/\//i, '')
  }
}

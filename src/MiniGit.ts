import childProcess from 'child_process'
import { debugLog } from './debugLog'

export class MiniGit {
  public showTopLevel (): string | null {
    return this.tryExec('rev-parse --show-toplevel')
  }

  public remoteURL (): string | null {
    const branch = this.currentBranch()
    if (branch === null) {
      return null
    }

    const cfg = this.configLocal()
    const branchRemoteKey = `branch.${branch}.remote`
    const remoteName = cfg.get(branchRemoteKey)
    if (remoteName === undefined) {
      return null
    }

    const remoteURLKey = `remote.${remoteName}.url`
    const remoteURL = cfg.get(remoteURLKey)
    if (remoteURL === undefined) {
      return null
    }
    return remoteURL
  }

  public currentBranch (): string | null {
    return this.tryExec('rev-parse --abbrev-ref HEAD')
  }

  public configLocal (): Map<string, string> {
    const cfg = new Map<string, string>()
    const rawConfig = this.tryExec('config --list --local')
    if (rawConfig === null) {
      return cfg
    }
    const pairs = rawConfig.split(/\n/).map((s: string) => s.trim().split('='))
    for (let i = 0; i < pairs.length; i++) {
      cfg.set(pairs[i][0], pairs[i][1])
    }
    return cfg
  }

  public tryExec (cmd: string): string | null {
    try {
      const result = childProcess.execSync(`git ${cmd}`)
      return result.toString('utf-8').trim()
    } catch (err: any) {
      debugLog(() => `MiniGit: failed to run ${cmd}: ${JSON.stringify(err)}`)
      return null
    }
  }
}

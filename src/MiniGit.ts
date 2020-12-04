import childProcess from 'child_process'

export class MiniGit {
  public showTopLevel (): string | null {
    try {
      const wt = childProcess.execSync('git rev-parse --show-toplevel')
      return wt.toString('utf-8').trim()
    } catch (_err: any) {
      return null
    }
  }
}

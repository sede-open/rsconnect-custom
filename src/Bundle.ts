import fs from 'fs'
import tmp, { FileResult } from 'tmp'

import { debugLog } from './debugLog'
import { Manifest } from './Manifest'

if (process.env.DEBUG !== 'enabled') {
  tmp.setGracefulCleanup()
}

export class Bundle {
  public manifestPath?: string
  public manifest?: Manifest
  private readonly f: FileResult

  constructor (manifestPath?: string, manifest?: Manifest) {
    this.manifestPath = manifestPath
    this.manifest = manifest
    this.f = tmp.fileSync({
      prefix: 'rsconnect-ts',
      postfix: 'bundle.tar.gz'
    })
  }

  get tarballPath (): string {
    return this.f.name
  }

  size (): number {
    try {
      return fs.statSync(this.tarballPath).size
    } catch (err: any) {
      debugLog(() => [
        'Bundle: could not get size',
        `err=${JSON.stringify(err)}`
      ].join(' '))
      return -1
    }
  }
}

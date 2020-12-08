import crypto from 'crypto'
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

  sha1 (): string {
    try {
      return crypto.createHash('sha1')
        .update(fs.readFileSync(this.tarballPath))
        .digest('hex')
    } catch (err: any) {
      debugLog(() => [
        'Bundle: could not get sha1 of',
        `tarball=${JSON.stringify(this.tarballPath)}`,
        `err=${JSON.stringify(err)}`
      ].join(' '))

      return '0000000000000000000000000000000000000000'
    }
  }

  size (): number {
    try {
      return fs.statSync(this.tarballPath).size
    } catch (err: any) {
      debugLog(() => [
        'Bundle: could not get size of',
        `tarball=${JSON.stringify(this.tarballPath)}`,
        `err=${JSON.stringify(err)}`
      ].join(' '))
      return -1
    }
  }
}

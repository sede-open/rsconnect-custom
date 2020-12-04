import tmp, { FileResult } from 'tmp'
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
}

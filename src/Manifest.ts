import fs from 'fs'
import path from 'path'

import { ManifestFile } from './ManifestFile'

export class Manifest {
  public source: string
  private readonly rawData: Map<string, any>

  constructor (source: string) {
    this.source = source
    this.rawData = new Map<string, any>()
    const rawObject = JSON.parse(fs.readFileSync(this.source).toString('utf-8'))
    for (const key in rawObject) {
      this.rawData.set(key, rawObject[key])
    }
  }

  get files (): Map<string, ManifestFile> {
    const fileMap = new Map<string, ManifestFile>()
    if (!this.rawData.has('files')) {
      return fileMap
    }
    const rawFiles = this.rawData.get('files')
    Object.keys(rawFiles).forEach((key: string) => {
      if (key === 'packrat/packrat.lock' || key.match(/^packrat\/desc\//) !== null) {
        return
      }
      fileMap.set(key, rawFiles[key])
    })
    return fileMap
  }

  get title (): string | null {
    let filename: string | null = path.basename(path.dirname(this.source))
    if (this.rawData.has('metadata')) {
      const metadata = this.rawData.get('metadata')
      for (const prop of ['entrypoint', 'primary_rmd', 'primary_html']) {
        const value = metadata[prop]
        if (value !== null && value !== undefined && value !== '') {
          filename = value
          break
        }
      }
    }

    if (filename === null) {
      return null
    }

    return filename
  }
}

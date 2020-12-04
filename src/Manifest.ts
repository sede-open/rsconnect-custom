import fs from "fs"
import path from "path"

import { ManifestFile } from "./ManifestFile";

export class Manifest {
    public source: string
    private rawData: Map<string, any>

    constructor(source: string) {
        this.source = source
        this.rawData = new Map<string, any>()
        const rawObject = JSON.parse(fs.readFileSync(this.source).toString('utf-8'))
        for (let key in rawObject) {
            this.rawData.set(key as string, rawObject[key])
        }
    }

    get files(): Map<string, ManifestFile> {
        const fileMap = new Map<string, ManifestFile>()
        if (!this.rawData.has('files')) {
            return fileMap
        }
        const rawFiles = this.rawData.get('files')
        Object.keys(rawFiles).forEach((key: string) => {
            if (key === "packrat/packrat.lock" || key.match(/^packrat\/desc\//)) {
                return
            }
            fileMap.set(key, rawFiles[key])
        })
        return fileMap
    }

    get title(): string | null {
        let filename: string | null = null
        if (this.rawData.has('metadata')) {
            const metadata = this.rawData.get('metadata')
            filename = (
                metadata['entrypoint'] ||
                metadata['primary_rmd'] ||
                metadata['primary_html']
            )
            if (filename && filename.match(/^[A-Za-z0-9_]+:[A-Za-z0-9_]+$/)) {
                filename = null
            }
        }
        if (filename == null) {
            return null
        }
        return this.defaultTitle(filename)
    }

    private defaultTitle(fileName: string): string {
        return path.basename(path.resolve(process.cwd(), fileName))
    }
}

import fs from "fs"

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
}
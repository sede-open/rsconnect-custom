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
        if (!this.rawData.has('files')) {
            return new Map<string, ManifestFile>()
        }
        return this.rawData.get('files') as Map<string, ManifestFile>
    }
}
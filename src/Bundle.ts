import tmp, { FileResult } from "tmp"

export class Bundle {
    public manifestPath?: string
    private f: FileResult

    constructor(manifestPath?: string) {
        this.manifestPath = manifestPath
        this.f = tmp.fileSync()
    }

    get tarballPath() {
        return this.f.name
    }
}
import tmp, { FileResult } from "tmp"

if (process.env.DEBUG !== "enabled") {
    tmp.setGracefulCleanup()
}

export class Bundle {
    public manifestPath?: string
    private f: FileResult

    constructor(manifestPath?: string) {
        this.manifestPath = manifestPath
        this.f = tmp.fileSync({
            prefix: "rsconnect-ts",
            postfix: "bundle.tar.gz"
        })
    }

    get tarballPath() {
        return this.f.name
    }
}
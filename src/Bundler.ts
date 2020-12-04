import path from "path";
import tar from "tar"

import { log } from "./log"
import { Bundle } from "./Bundle";
import { Manifest } from "./Manifest";

export class Bundler {
    constructor() {}

    public async fromManifest(manifestPath: string): Promise<Bundle> {
        const bundle = new Bundle(manifestPath)
        const manifest = new Manifest(manifestPath)
        const fileList = [
            path.basename(manifestPath),
        ].concat(Array.from(manifest.files.keys()))

        await tar.create(
            { gzip: true, file: bundle.tarballPath, cwd: path.dirname(manifestPath) },
            fileList
        )
        return bundle
    }
}
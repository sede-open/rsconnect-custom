import fs from "fs"
import path from "path";
import tar from "tar"
import { Bundle } from "./Bundle";
import { Manifest } from "./Manifest";

export class Bundler {
    constructor() {}

    public async fromManifest(manifestPath: string): Promise<Bundle> {
        const bundle = new Bundle(manifestPath)
        const manifest = this.loadManifest(manifestPath)
        await tar.create(
            { gzip: true, file: bundle.tarballPath, cwd: path.dirname(manifestPath) },
            [path.basename(manifestPath), ...Object.keys(manifest.files)]
        )
        return bundle
    }

    private loadManifest(manifestPath: string): Manifest {
        return JSON.parse(fs.readFileSync(manifestPath).toString('utf-8'))
    }
}
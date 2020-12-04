import { Bundle } from "./Bundle";
export declare class Bundler {
    constructor();
    fromManifest(manifestPath: string): Promise<Bundle>;
}

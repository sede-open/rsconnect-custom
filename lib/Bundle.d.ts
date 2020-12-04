import { Manifest } from "./Manifest";
export declare class Bundle {
    manifestPath?: string;
    manifest?: Manifest;
    private f;
    constructor(manifestPath?: string, manifest?: Manifest);
    get tarballPath(): string;
}

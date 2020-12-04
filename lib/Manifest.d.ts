import { ManifestFile } from "./ManifestFile";
export declare class Manifest {
    source: string;
    private rawData;
    constructor(source: string);
    get files(): Map<string, ManifestFile>;
    get title(): string | null;
    private defaultTitle;
}

import { ManifestFile } from './ManifestFile';
export declare class Manifest {
    source: string;
    private readonly rawData;
    constructor(source: string);
    get files(): Map<string, ManifestFile>;
    get title(): string | null;
    private defaultTitle;
}

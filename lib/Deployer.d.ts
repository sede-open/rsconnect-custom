import { APIClient } from './APIClient';
import { Bundle } from './Bundle';
import { DeployTaskResponse } from './DeployTaskResponse';
export declare class Deployer {
    private readonly client;
    private readonly bundler;
    private readonly pather;
    constructor(client: APIClient);
    deployManifest(manifestPath: string, appPath?: string): Promise<DeployTaskResponse>;
    deployBundle(bundle: Bundle, appPath?: string): Promise<DeployTaskResponse>;
    private findExistingApp;
    private makeDeploymentName;
}

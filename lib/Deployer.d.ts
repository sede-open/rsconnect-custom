import { APIClient } from "./APIClient";
import { Bundle } from "./Bundle";
import { DeployTaskResponse } from "./DeployTaskResponse";
export declare class Deployer {
    private client;
    private bundler;
    private git;
    constructor(client: APIClient);
    deployManifest(manifestPath: string, appPath?: string): Promise<DeployTaskResponse>;
    deployBundle(bundle: Bundle, appPath?: string): Promise<DeployTaskResponse>;
    private findExistingApp;
    private resolveAppPath;
    private strictAppPath;
    private makeDeploymentName;
}

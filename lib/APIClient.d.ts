import { AxiosResponse } from 'axios';
import { APIClientConfiguration } from './APIClientConfiguration';
import { Application } from './Application';
import { Bundle } from './Bundle';
import { ClientTaskResponse } from './ClientTaskResponse';
import { ExtendedBundleResponse } from './ExtendedBundleResponse';
import { ListApplicationsParams } from './ListApplicationParams';
import { ListApplicationsResponse } from './ListApplicationsResponse';
import { VanityRecordResponse } from './VanityRecordResponse';
export declare class APIClient {
    cfg: APIClientConfiguration;
    private readonly client;
    constructor(cfg: APIClientConfiguration);
    createApp(appName: string): Promise<Application>;
    getApp(appID: number): Promise<Application>;
    updateApp(appID: number, updates: any): Promise<Application>;
    updateAppVanityURL(appID: number, vanityURL: string): Promise<VanityRecordResponse>;
    uploadApp(appID: number, bundle: Bundle): Promise<ExtendedBundleResponse>;
    deployApp(appID: number, bundleID: number): Promise<ClientTaskResponse>;
    listApplications(params?: ListApplicationsParams): Promise<ListApplicationsResponse>;
    getTask(taskId: string, status?: number): Promise<ClientTaskResponse>;
    serverSettings(sub?: string | undefined): Promise<AxiosResponse>;
}

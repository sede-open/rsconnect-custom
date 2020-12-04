declare module "APIClientConfiguration" {
    export interface APIClientConfiguration {
        baseURL: string;
        apiKey: string;
    }
}
declare module "Application" {
    export interface Application {
        id: number;
        guid: string;
        accessType: string;
        connectionTimeout?: number;
        readTimeout?: number;
        initTimeout?: number;
        idleTimeout?: number;
        maxProcesses?: number;
        minProcesses?: number;
        maxConnsPerProcess?: number;
        loadFactor?: number;
        url: string;
        vanityUrl: boolean;
        name: string;
        title?: string;
        bundleId: number;
        appMode: number;
        contentCategory: string;
        hasParameters: boolean;
        createdTime: Date;
        lastDeployedTime: Date;
        rVersion?: string;
        pyVersion?: string;
        buildStatus: number;
        runAs?: string;
        runAsCurrentUser: boolean;
        description: string;
        appRole: string;
        ownerFirstName: string;
        ownerLastName: string;
        ownerUsername: string;
        ownerGuid: string;
        ownerEmail: string;
        ownerLocked: boolean;
        isScheduled: boolean;
        git?: string;
    }
}
declare module "ManifestFile" {
    export interface ManifestFile {
        checksum: string;
    }
}
declare module "Manifest" {
    import { ManifestFile } from "ManifestFile";
    export class Manifest {
        source: string;
        private rawData;
        constructor(source: string);
        get files(): Map<string, ManifestFile>;
        get title(): string | null;
        private defaultTitle;
    }
}
declare module "Bundle" {
    import { Manifest } from "Manifest";
    export class Bundle {
        manifestPath?: string;
        manifest?: Manifest;
        private f;
        constructor(manifestPath?: string, manifest?: Manifest);
        get tarballPath(): string;
    }
}
declare module "ClientTaskResponse" {
    export interface ClientTaskResponse {
        id: string;
        userId: number;
        status: string[];
        result?: ClientTaskResult;
        finished: boolean;
        code: number;
        error: string;
        lastStatus: number;
    }
    export interface ClientTaskResult {
        type: string;
        data: any;
    }
}
declare module "conversions" {
    export function snake2camel(obj: any): any;
}
declare module "ExtendedBundleResponse" {
    export interface ExtendedBundleResponse {
        id: number;
        appId: number;
        createdTime: Date;
        updatedTime: Date;
        rVersion?: string;
        pyVersion?: string;
        buildStatus: number;
        size?: number;
        active: boolean;
    }
}
declare module "ListApplicationParams" {
    export interface ListApplicationsParams {
        count: number;
        start: number;
        cont: string;
    }
}
declare module "ListApplicationsResponse" {
    import { Application } from "Application";
    export interface ListApplicationsResponse {
        applications: Application[];
        count: number;
        total: number;
        continuation: string;
    }
}
declare module "VanityRecordResponse" {
    export interface VanityRecordResponse {
        id?: number;
        appId: number;
        appGuid: string;
        pathPrefix: string;
        createdTime?: Date;
    }
}
declare module "APIClient" {
    import { AxiosResponse } from "axios";
    import { APIClientConfiguration } from "APIClientConfiguration";
    import { Application } from "Application";
    import { Bundle } from "Bundle";
    import { ClientTaskResponse } from "ClientTaskResponse";
    import { ExtendedBundleResponse } from "ExtendedBundleResponse";
    import { ListApplicationsParams } from "ListApplicationParams";
    import { ListApplicationsResponse } from "ListApplicationsResponse";
    import { VanityRecordResponse } from "VanityRecordResponse";
    export class APIClient {
        cfg: APIClientConfiguration;
        private client;
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
}
declare module "log" {
    export const log: Console;
}
declare module "Bundler" {
    import { Bundle } from "Bundle";
    export class Bundler {
        constructor();
        fromManifest(manifestPath: string): Promise<Bundle>;
    }
}
declare module "ClientTaskPoller" {
    import { APIClient } from "APIClient";
    export class ClientTaskPoller {
        private client;
        private taskId;
        private sleepInterval;
        constructor(client: APIClient, taskId: string, sleepInterval?: number);
        poll(timeout?: number): AsyncGenerator<ClientTaskPollResult>;
        private sleepTick;
    }
    export interface ClientTaskPollResult {
        status: string[];
        type?: string;
        data?: any;
    }
}
declare module "DeployTaskResponse" {
    export interface DeployTaskResponse {
        taskId: string;
        appId: number;
        appGuid: string;
        appUrl: string;
        title: string;
    }
}
declare module "ListApplicationsPager" {
    import { APIClient } from "APIClient";
    import { Application } from "Application";
    export class ListApplicationsPager {
        private client;
        constructor(client: APIClient);
        listApplications(maxRecords?: number): AsyncGenerator<Application, unknown, unknown>;
    }
}
declare module "MiniGit" {
    export class MiniGit {
        showTopLevel(): string | null;
    }
}
declare module "Deployer" {
    import { APIClient } from "APIClient";
    import { Bundle } from "Bundle";
    import { DeployTaskResponse } from "DeployTaskResponse";
    export class Deployer {
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
}
declare module "main" {
    export { APIClient } from "APIClient";
    export { APIClientConfiguration } from "APIClientConfiguration";
    export { ClientTaskPoller } from "ClientTaskPoller";
    export { DeployTaskResponse } from "DeployTaskResponse";
    export { Deployer } from "Deployer";
    export { ListApplicationsPager } from "ListApplicationsPager";
}

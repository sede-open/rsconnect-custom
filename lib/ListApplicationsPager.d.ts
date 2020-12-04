import { APIClient } from "./APIClient";
import { Application } from "./Application";
export declare class ListApplicationsPager {
    private client;
    constructor(client: APIClient);
    listApplications(maxRecords?: number): AsyncGenerator<Application, unknown, unknown>;
}

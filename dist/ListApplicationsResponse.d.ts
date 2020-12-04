import { Application } from "./Application";
export interface ListApplicationsResponse {
    applications: Application[];
    count: number;
    total: number;
    continuation: string;
}

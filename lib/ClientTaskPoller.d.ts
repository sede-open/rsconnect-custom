import { APIClient } from './APIClient';
export declare class ClientTaskPoller {
    private readonly client;
    private readonly taskId;
    private readonly sleepInterval;
    constructor(client: APIClient, taskId: string, sleepInterval?: number);
    poll(timeout?: number): AsyncGenerator<ClientTaskPollResult>;
    private sleepTick;
}
export interface ClientTaskPollResult {
    status: string[];
    type?: string;
    data?: any;
}

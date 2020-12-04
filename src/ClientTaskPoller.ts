import { APIClient } from "./APIClient"
import { ClientTaskResponse } from "./ClientTaskResponse"

export class ClientTaskPoller {
    private client: APIClient
    private taskId: string
    private sleepInterval: number

    constructor(client: APIClient, taskId: string, sleepInterval?: number) {
        this.client = client
        this.taskId = taskId
        this.sleepInterval = sleepInterval || 500
    }

    public async *poll(timeout?: number): AsyncGenerator<ClientTaskPollResult> {
        let pollTimeout = timeout ? ((Date.now() / 1000 | 0) + timeout) : Infinity
        let lastStatus: number | undefined = undefined
        while ((Date.now() / 1000 | 0) < pollTimeout) {
            await this.sleepTick()
            const curTask: ClientTaskResponse = await this.client.getTask(
                this.taskId, lastStatus
            )
            yield {
                status: curTask.status,
                type: curTask.result?.type,
                data: curTask.result?.data,
            }
            lastStatus = curTask.lastStatus
            if (curTask.finished) {
                return
            }
        }
    }

    private async sleepTick(): Promise<void> {
        return new Promise((resolve: any) => {
            setTimeout(resolve, this.sleepInterval)
        })
    }
}

export interface ClientTaskPollResult {
    status: string[]
    type?: string
    data?: any
}
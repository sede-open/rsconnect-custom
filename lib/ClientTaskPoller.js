"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTaskPoller = void 0;
class ClientTaskPoller {
    constructor(client, taskId, sleepInterval) {
        this.client = client;
        this.taskId = taskId;
        this.sleepInterval = sleepInterval || 500;
    }
    async *poll(timeout) {
        var _a, _b;
        let pollTimeout = timeout ? ((Date.now() / 1000 | 0) + timeout) : Infinity;
        let lastStatus = undefined;
        while ((Date.now() / 1000 | 0) < pollTimeout) {
            await this.sleepTick();
            const curTask = await this.client.getTask(this.taskId, lastStatus);
            yield {
                status: curTask.status,
                type: (_a = curTask.result) === null || _a === void 0 ? void 0 : _a.type,
                data: (_b = curTask.result) === null || _b === void 0 ? void 0 : _b.data,
            };
            lastStatus = curTask.lastStatus;
            if (curTask.finished) {
                return;
            }
        }
    }
    async sleepTick() {
        return new Promise((resolve) => {
            setTimeout(resolve, this.sleepInterval);
        });
    }
}
exports.ClientTaskPoller = ClientTaskPoller;

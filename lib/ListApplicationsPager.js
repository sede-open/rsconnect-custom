"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListApplicationsPager = void 0;
const conversions_1 = require("./conversions");
class ListApplicationsPager {
    constructor(client) {
        this.client = client;
    }
    async *listApplications(maxRecords) {
        let resetMaxRecords = false;
        if (maxRecords === undefined || maxRecords === null || maxRecords <= 0) {
            maxRecords = Infinity;
            resetMaxRecords = true;
        }
        let n = 0;
        let pageParams = {
            start: 0,
            count: maxRecords < 100 ? maxRecords : 100,
            cont: ""
        };
        while (pageParams.start < maxRecords) {
            const page = await this.client.listApplications(pageParams);
            if (n === 0) {
                if (resetMaxRecords || maxRecords > page.total) {
                    maxRecords = page.total;
                }
            }
            for (let i = 0; i < page.applications.length; i++) {
                if (n >= maxRecords) {
                    return n;
                }
                n++;
                yield conversions_1.snake2camel(page.applications[i]);
            }
            pageParams.cont = page.continuation;
            pageParams.start += pageParams.count;
        }
        return n;
    }
}
exports.ListApplicationsPager = ListApplicationsPager;

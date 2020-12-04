"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const conversions_1 = require("./conversions");
class APIClient {
    constructor(cfg) {
        this.cfg = cfg;
        this.client = axios_1.default.create({
            baseURL: this.cfg.baseURL,
            headers: {
                Authorization: `Key ${this.cfg.apiKey}`
            }
        });
    }
    async createApp(appName) {
        return this.client.post('applications', { name: appName })
            .then((resp) => conversions_1.snake2camel(resp.data));
    }
    async getApp(appID) {
        return this.client.get(`applications/${appID}`)
            .then((resp) => conversions_1.snake2camel(resp.data));
    }
    async updateApp(appID, updates) {
        return this.client.post(`applications/${appID}`, updates)
            .then((resp) => conversions_1.snake2camel(resp.data));
    }
    async updateAppVanityURL(appID, vanityURL) {
        return this.client.post(`applications/${appID}/vanities`, { 'app_id': appID, 'path_prefix': vanityURL }).then((resp) => conversions_1.snake2camel(resp.data));
    }
    async uploadApp(appID, bundle) {
        return this.client.post(`applications/${appID}/upload`, fs_1.default.createReadStream(bundle.tarballPath)).then((resp) => conversions_1.snake2camel(resp.data));
    }
    async deployApp(appID, bundleID) {
        return this.client.post(`applications/${appID}/deploy`, { bundle: bundleID }).then((resp) => conversions_1.snake2camel(resp.data));
    }
    async listApplications(params) {
        return this.client.get('applications', { params })
            .then((resp) => {
            const data = resp.data;
            const { applications, count, total, continuation } = data;
            return {
                applications: applications.map(conversions_1.snake2camel),
                count,
                total,
                continuation
            };
        });
    }
    async getTask(taskId, status) {
        return this.client.get(`tasks/${taskId}`, status
            ? { params: { 'first_status': status } }
            : undefined).then((resp) => conversions_1.snake2camel(resp.data));
    }
    async serverSettings(sub) {
        let path = 'server_settings';
        if (sub !== undefined) {
            if (['python', 'r'].includes(sub)) {
                path = `v1/server_settings/${sub}`;
            }
            else {
                path = `server_settings/${sub}`;
            }
        }
        return this.client.get(path);
    }
}
exports.APIClient = APIClient;

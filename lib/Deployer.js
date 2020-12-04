"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployer = void 0;
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const url_1 = require("url");
const Bundler_1 = require("./Bundler");
const ListApplicationsPager_1 = require("./ListApplicationsPager");
const MiniGit_1 = require("./MiniGit");
class Deployer {
    constructor(client) {
        this.client = client;
        this.bundler = new Bundler_1.Bundler();
        this.git = new MiniGit_1.MiniGit();
    }
    async deployManifest(manifestPath, appPath) {
        return this.deployBundle(await this.bundler.fromManifest(manifestPath), appPath);
    }
    async deployBundle(bundle, appPath) {
        var _a;
        let resolvedAppPath = this.resolveAppPath(bundle.manifestPath, appPath);
        let appID = null;
        let app = null;
        let reassignTitle = false;
        if (resolvedAppPath !== "") {
            // TODO: use an API that doesn't require scanning all applications, if possible
            const existingApp = await this.findExistingApp(resolvedAppPath);
            if (existingApp !== null) {
                appID = existingApp.id;
            }
        }
        const manifestTitle = (_a = bundle.manifest) === null || _a === void 0 ? void 0 : _a.title;
        if (appID === null) {
            const appName = this.makeDeploymentName(manifestTitle || resolvedAppPath);
            app = await this.client.createApp(appName);
            appID = app.id;
            reassignTitle = true;
        }
        else {
            app = await this.client.getApp(appID);
        }
        if (app == null) {
            return Promise.reject("unable to find or create app");
        }
        if (!app.vanityUrl && resolvedAppPath !== "") {
            await this.client.updateAppVanityURL(appID, resolvedAppPath);
        }
        if (manifestTitle !== undefined && manifestTitle !== null && reassignTitle) {
            app.title = manifestTitle;
            await this.client.updateApp(appID, { title: app.title });
        }
        const uploadedBundle = await this.client.uploadApp(appID, bundle);
        return this.client.deployApp(appID, uploadedBundle.id)
            .then((ct) => {
            const taskApp = app;
            return {
                taskId: ct.id,
                appId: taskApp.id,
                appGuid: taskApp.guid,
                appUrl: taskApp.url,
                title: taskApp.title || ''
            };
        });
    }
    async findExistingApp(appPath) {
        let found = null;
        const pager = new ListApplicationsPager_1.ListApplicationsPager(this.client);
        for await (const app of pager.listApplications()) {
            const currentAppPath = new url_1.URL(app.url).pathname;
            if (currentAppPath === appPath) {
                found = app;
                break;
            }
        }
        return found;
    }
    resolveAppPath(manifestPath, appPath) {
        if (appPath) {
            return this.strictAppPath(appPath);
        }
        if (!manifestPath) {
            return "";
        }
        const gitTopLevel = this.git.showTopLevel();
        if (gitTopLevel === null) {
            return this.strictAppPath(path_1.default.basename(path_1.default.dirname(manifestPath)));
        }
        const relPath = path_1.default.dirname(manifestPath).replace(gitTopLevel, "");
        return this.strictAppPath(relPath);
    }
    strictAppPath(appPath) {
        return ('/' +
            appPath.trim().replace(/${path.sep}/g, "/") +
            '/').replace(/\/\//g, '/').replace(/_+/, '_');
    }
    makeDeploymentName(title) {
        if (!title) {
            title = 'unnamed ' + crypto_1.default.randomBytes(15).toString('base64');
        }
        let name = title.toLowerCase().replace(/ /g, "_");
        name = name.replace(/[^A-Za-z0-9_ -]+/g, "");
        name = name.replace(/_+/g, "_");
        name = name.substring(0, 64);
        if (name.length < 3) {
            for (let i = name.length; i < 3; i++) {
                name += '_';
            }
        }
        return name;
    }
}
exports.Deployer = Deployer;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationPather = void 0;
const path_1 = __importDefault(require("path"));
const MiniGit_1 = require("./MiniGit");
class ApplicationPather {
    constructor() {
        this.git = new MiniGit_1.MiniGit();
    }
    resolve(manifestPath, appPath) {
        if (appPath !== null && appPath !== undefined) {
            return this.strictAppPath(appPath);
        }
        if (manifestPath === null || manifestPath === undefined) {
            return '';
        }
        const gitTopLevel = this.git.showTopLevel();
        if (gitTopLevel === null) {
            return this.strictAppPath(path_1.default.basename(path_1.default.dirname(manifestPath)));
        }
        const relPath = path_1.default.dirname(manifestPath).replace(gitTopLevel, '');
        return this.strictAppPath(relPath);
    }
    strictAppPath(appPath) {
        return ('/' +
            appPath.trim().replace(/${path.sep}/g, '/') +
            '/').replace(/\.\//g, '/').replace(/\/\//g, '/').replace(/_+/, '_');
    }
}
exports.ApplicationPather = ApplicationPather;

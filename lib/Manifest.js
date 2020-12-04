"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manifest = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Manifest {
    constructor(source) {
        this.source = source;
        this.rawData = new Map();
        const rawObject = JSON.parse(fs_1.default.readFileSync(this.source).toString('utf-8'));
        for (let key in rawObject) {
            this.rawData.set(key, rawObject[key]);
        }
    }
    get files() {
        const fileMap = new Map();
        if (!this.rawData.has('files')) {
            return fileMap;
        }
        const rawFiles = this.rawData.get('files');
        Object.keys(rawFiles).forEach((key) => {
            if (key === "packrat/packrat.lock" || key.match(/^packrat\/desc\//)) {
                return;
            }
            fileMap.set(key, rawFiles[key]);
        });
        return fileMap;
    }
    get title() {
        let filename = null;
        if (this.rawData.has('metadata')) {
            const metadata = this.rawData.get('metadata');
            filename = (metadata['entrypoint'] ||
                metadata['primary_rmd'] ||
                metadata['primary_html']);
            if (filename && filename.match(/^[A-Za-z0-9_]+:[A-Za-z0-9_]+$/)) {
                filename = null;
            }
        }
        if (filename == null) {
            return null;
        }
        return this.defaultTitle(filename);
    }
    defaultTitle(fileName) {
        return path_1.default.basename(path_1.default.resolve(process.cwd(), fileName));
    }
}
exports.Manifest = Manifest;

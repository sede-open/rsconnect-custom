"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundler = void 0;
const path_1 = __importDefault(require("path"));
const tar_1 = __importDefault(require("tar"));
const Bundle_1 = require("./Bundle");
const Manifest_1 = require("./Manifest");
class Bundler {
    async fromManifest(manifestPath) {
        const manifest = new Manifest_1.Manifest(manifestPath);
        const bundle = new Bundle_1.Bundle(manifestPath, manifest);
        const fileList = [
            path_1.default.basename(manifestPath)
        ].concat(Array.from(manifest.files.keys()));
        await tar_1.default.create({ gzip: true, file: bundle.tarballPath, cwd: path_1.default.dirname(manifestPath) }, fileList);
        return bundle;
    }
}
exports.Bundler = Bundler;

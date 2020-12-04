"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bundle = void 0;
const tmp_1 = __importDefault(require("tmp"));
if (process.env.DEBUG !== "enabled") {
    tmp_1.default.setGracefulCleanup();
}
class Bundle {
    constructor(manifestPath, manifest) {
        this.manifestPath = manifestPath;
        this.manifest = manifest;
        this.f = tmp_1.default.fileSync({
            prefix: "rsconnect-ts",
            postfix: "bundle.tar.gz"
        });
    }
    get tarballPath() {
        return this.f.name;
    }
}
exports.Bundle = Bundle;

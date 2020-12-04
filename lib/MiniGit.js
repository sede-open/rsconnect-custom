"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniGit = void 0;
const child_process_1 = __importDefault(require("child_process"));
class MiniGit {
    showTopLevel() {
        try {
            const wt = child_process_1.default.execSync('git rev-parse --show-toplevel');
            return wt.toString('utf-8').trim();
        }
        catch (_err) {
            return null;
        }
    }
}
exports.MiniGit = MiniGit;

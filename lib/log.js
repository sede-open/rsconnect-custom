"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const console_1 = require("console");
function buildLog() {
    // TODO: fs.createWriteStream to somewhere in ~/.cache/ ?
    return new console_1.Console(process.stdout, process.stderr);
}
exports.log = buildLog();

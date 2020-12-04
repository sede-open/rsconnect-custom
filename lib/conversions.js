"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snake2camel = void 0;
function snake2camel(obj) {
    if (typeof (obj) === 'string') {
        return (obj).replace(/(_.)/, (match) => match.replace('_', '').toUpperCase());
    }
    const out = {};
    Object.keys(obj).forEach((k) => {
        const camelKey = snake2camel(k);
        out[camelKey] = obj[k];
    });
    return out;
}
exports.snake2camel = snake2camel;

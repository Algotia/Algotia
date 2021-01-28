"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const getDirs_1 = require("./getDirs");
const fs_1 = __importDefault(require("fs"));
const mkdirIfNotExists = (path) => {
    if (!fs_1.default.existsSync(path)) {
        fs_1.default.mkdirSync(path);
    }
};
const bootstrap = () => {
    mkdirIfNotExists(getDirs_1.getInternalDir());
    mkdirIfNotExists(getDirs_1.getCacheDir());
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map
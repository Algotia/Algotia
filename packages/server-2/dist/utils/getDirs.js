"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheDir = exports.getStrategyDir = exports.getInternalDir = void 0;
const pkg_dir_1 = __importDefault(require("pkg-dir"));
const path_1 = __importDefault(require("path"));
const services_1 = require("../services");
const getInternalDir = () => {
    return path_1.default.join(pkg_dir_1.default.sync(__dirname), ".internal/");
};
exports.getInternalDir = getInternalDir;
const getStrategyDir = () => {
    const configService = new services_1.ConfigService();
    const appDir = configService.get("appDir");
    return path_1.default.join(appDir, "strategies");
};
exports.getStrategyDir = getStrategyDir;
const getCacheDir = () => {
    return path_1.default.join(exports.getInternalDir(), "cache/");
};
exports.getCacheDir = getCacheDir;
//# sourceMappingURL=getDirs.js.map
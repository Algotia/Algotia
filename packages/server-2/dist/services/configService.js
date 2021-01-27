"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const joi_1 = __importDefault(require("joi"));
const op_cache_1 = __importDefault(require("op-cache"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const cacheFile = path_1.default.join(utils_1.getCacheDir(), "config.cache");
class ConfigService extends op_cache_1.default {
    constructor() {
        super({
            path: cacheFile,
        });
        this.defaultConfig = {
            port: 2008,
            appDir: path_1.default.join(os_1.default.homedir(), "algotia"),
        };
        for (const k in this.defaultConfig) {
            if (this.defaultConfig.hasOwnProperty(k)) {
                const key = k;
                if (!this.has(key)) {
                    this.set(key, this.defaultConfig[key], true);
                }
            }
        }
    }
    validate(options) {
        options = Object.assign(this.defaultConfig, options);
        const schema = joi_1.default.object({
            port: joi_1.default.number().port(),
            appDir: joi_1.default.string().custom((val, helpers) => {
                try {
                    fs_1.default.accessSync(val);
                }
                catch (err) {
                    return helpers.error("any.invalid");
                }
                return val;
            }),
        });
        return schema.validate(options, {
            stripUnknown: true,
        });
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=configService.js.map
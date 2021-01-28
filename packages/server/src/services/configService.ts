import Joi, { ValidationResult } from "joi";
import OPCache from "op-cache";
import node_path from "path";
import { ConfigOptions } from "../types";
import { getCacheDir } from "../utils";
import fs from "fs";
import os from "os";

const cacheFile = node_path.join(getCacheDir(), "config.cache");

export class ConfigService extends OPCache<ConfigOptions> {
    constructor() {
        super({
            path: cacheFile,
        });

        for (const k in this.defaultConfig) {
            if (this.defaultConfig.hasOwnProperty(k)) {
                const key = k as keyof ConfigOptions;
                if (!this.has(key)) {
                    this.set(key, this.defaultConfig[key], true);
                }
            }
        }
    }

    defaultConfig: ConfigOptions = {
        port: 2008,
        appDir: node_path.join(os.homedir(), "algotia"),
    };

    validate(options: Partial<ConfigOptions>): ValidationResult {
        options = Object.assign(this.defaultConfig, options);

        const schema = Joi.object<ConfigOptions>({
            port: Joi.number().port(),
            appDir: Joi.string().custom((val, helpers) => {
                try {
                    fs.accessSync(val);
                } catch (err) {
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

import { ConfigOptions } from "@algotia/types";
import Joi, { ValidationResult } from "joi";
import node_path from "path";
import OPCache from "op-cache";
import pkgDir from "pkg-dir";
import { isTest } from "./isEnv";

class Configurer extends OPCache<ConfigOptions> {
    constructor() {
        super({
            path: node_path.join(
                pkgDir.sync(),
                isTest
                    ? ".internal/cache/config.dev.json"
                    : ".internal/cache/config.prod.json"
            ),
        });
        if (!this.has("port")) {
            this.set("port", this.default.port, true);
        }
        if (isTest && !this.has("strategyDir")) {
            for (const k in this.devConfig) {
                const key = k as keyof ConfigOptions;
                if (!this.has(key)) {
                    this.set(
                        key as keyof ConfigOptions,
                        this.devConfig[key],
                        true
                    );
                }
            }
        }
    }

    default: ConfigOptions = {
        port: 2008,
    } as const;

    devConfig: ConfigOptions = {
        ...this.default,
        strategyDir: node_path.join(pkgDir.sync(), "__ALGOTIA__DIR__"),
    };

    validate = (obj: ConfigOptions): ValidationResult => {
        const schema = Joi.object<ConfigOptions>({
            port: Joi.number().port(),
            strategyDir: Joi.string(),
        });

        return schema.validate(obj, {
            stripUnknown: true,
        });
    };
}

export default Configurer;

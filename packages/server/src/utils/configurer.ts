import { ConfigOptions } from "../types";
import Joi, { ValidationResult } from "joi";
import node_path from "path";
import OPCache from "op-cache";
import pkgDir from "pkg-dir";

class Configurer extends OPCache<ConfigOptions> {
    constructor() {
        super({
            path: node_path.join(pkgDir.sync(), ".internal/cache/config.json"),
        });
    }

    default: ConfigOptions = {
        port: 2008,
    } as const;

    validate = (obj: ConfigOptions): ValidationResult => {
        const schema = Joi.object<ConfigOptions>({
            port: Joi.number().port(),
        });

        return schema.validate(obj, {
            stripUnknown: true,
        });
    };
}

export default Configurer;

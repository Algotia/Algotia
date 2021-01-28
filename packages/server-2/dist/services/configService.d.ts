import { ValidationResult } from "joi";
import OPCache from "op-cache";
import { ConfigOptions } from "../types";
export declare class ConfigService extends OPCache<ConfigOptions> {
    constructor();
    defaultConfig: ConfigOptions;
    validate(options: Partial<ConfigOptions>): ValidationResult;
}

import { Controller } from "tsoa";
import { ConfigService } from "../services";
import { ConfigOptions } from "../types";
export declare class ConfigController extends Controller {
    configService: ConfigService;
    getAllConfigOptions(): {
        [k: string]: string | number;
    };
    getConfigOptionByKey(key: keyof ConfigOptions): string | number;
}

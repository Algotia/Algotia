import { Controller, Get, Path, Route } from "tsoa";
import { ConfigOptions } from "@algotia/types";
import { config } from "@algotia/utils";

@Route("config")
export class ConfigController extends Controller {
    @Get()
    public getAllConfigOptions() {
        return config.store;
    }

    @Get("{key}")
    public getConfigOptionByKey(@Path() key: keyof ConfigOptions) {
        return config.get(key);
    }
}

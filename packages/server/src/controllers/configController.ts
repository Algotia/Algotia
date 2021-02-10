import { ConfigOptions } from "@algotia/types";
import { ConfigService } from "../services";
import { Controller, Get, Path, Route } from "tsoa";

@Route("config")
export class ConfigController extends Controller {
    configService = new ConfigService();

    @Get()
    public getAllConfigOptions() {
        return Object.fromEntries(this.configService);
    }

    @Get("{key}")
    public getConfigOptionByKey(@Path() key: keyof ConfigOptions) {
        return this.configService.get(key);
    }
}

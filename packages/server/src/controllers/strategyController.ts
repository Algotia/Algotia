import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import { FileStructure, StrategyFile, StrategyMetaData } from "@algotia/types";
import { strategyManager } from "../utils";

@Route("strategy")
export class StrategyController extends Controller {
    strategyManager = strategyManager;

    @Get()
    public getAllStrategies(): StrategyMetaData[] {
        return this.strategyManager.getAllStrategies();
    }

    @Get("file/{fileName}")
    public readStrategyFile(@Path() fileName: string): StrategyFile {
        return this.strategyManager.readStrategyFile(fileName);
    }

    @Get("dir/{strategyDir}")
    public readStrategyDir(@Path() strategyDir: string): FileStructure {
        return this.strategyManager.readStrategyDir(strategyDir);
    }

    @Post("file")
    public writeStrategyFile(
        @Body() body: { contents: string; path: string }
    ): void {
        return this.strategyManager.writeStrategyFile(body.path, body.contents);
    }
}

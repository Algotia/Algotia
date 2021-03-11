import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import {
    FileStructure,
    StrategyFile,
    StrategyLanguages,
    StrategyMetaData,
} from "@algotia/types";
import { strategyManager } from "../utils";

@Route("strategy")
export class StrategyController extends Controller {
    strategyManager = strategyManager;

    @Get("all")
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

    @Post("create")
    public async createNewStrategy(
        @Body()
        body: {
            name: string;
            language: StrategyLanguages;
        }
    ): Promise<void> {
        await this.strategyManager.createStrategy({
            packageName: body.name,
            language: body.language,
        });
    }

    @Post("file")
    public writeStrategyFile(
        @Body() body: { contents: string; path: string }
    ): void {
        return this.strategyManager.writeStrategyFile(body.path, body.contents);
    }
}

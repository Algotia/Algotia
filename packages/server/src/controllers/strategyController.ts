import { Body, Controller, Get, Path, Post, Route } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";
import { StrategyMetaData, WriteStrategyOptions } from "../types";

@Route("strategy")
export class StrategyController extends Controller {
    strategyService = new StrategyService();

    @Get()
    public getAllStrategies(): StrategyMetaData[] {
        return this.strategyService.getAllStrategies();
    }

    @Get("{fileName}")
    public getStrategyByFilename(@Path() fileName: string): GetStrategyResult {
        return this.strategyService.getStrategy(fileName);
    }

    @Post("{fileName}")
    public writeStrategy(
        @Path() fileName: string,
        @Body() contents: WriteStrategyOptions
    ): void {
        return this.strategyService.writeStrategy(fileName, contents);
    }
}

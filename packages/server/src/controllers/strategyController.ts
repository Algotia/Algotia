import { Controller, Get, Path, Route } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";
import { StrategyMetaData } from "../types";

@Route("strategy")
export class StrategyController extends Controller {
    strategyService = new StrategyService();

    @Get()
    public getAllStrategyMetaData(): StrategyMetaData[] {
        return this.strategyService.getAllStrategyMetaData();
    }

    @Get("{fileName}")
    public getStrategyByFilename(@Path() fileName: string): GetStrategyResult {
        return this.strategyService.getStrategy(fileName);
    }
}

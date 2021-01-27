import { Controller, Get, Path, Route } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";

@Route("strategy")
export class StrategyController extends Controller {
    strategyService = new StrategyService();

    @Get("{fileName}")
    public getStrategyByFilename(@Path() fileName: string): GetStrategyResult {
        return this.strategyService.getStrategy(fileName);
    }
}

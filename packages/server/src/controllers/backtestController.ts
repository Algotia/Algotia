import { Body, Controller, Post, Route } from "tsoa";
import { BacktestService } from "../services";
import {
    CreateBacktestOptions,
    CreateBacktestResult,
} from "../services/backtestService";

@Route("backtest")
export class BacktestController extends Controller {
    private backtestService = new BacktestService();

    @Post()
    public async createBacktest(
        @Body() reqBody: CreateBacktestOptions
    ): Promise<CreateBacktestResult> {
        return await this.backtestService.create(reqBody);
    }
}

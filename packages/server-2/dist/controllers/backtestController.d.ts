import { Controller } from "tsoa";
import { CreateBacktestOptions, CreateBacktestResult } from "../services/backtestService";
export declare class BacktestController extends Controller {
    private backtestService;
    createBacktest(reqBody: CreateBacktestOptions): Promise<CreateBacktestResult>;
}

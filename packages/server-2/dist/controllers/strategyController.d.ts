import { Controller } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";
export declare class StrategyController extends Controller {
    strategyService: StrategyService;
    getStrategyByFilename(fileName: string): GetStrategyResult;
}

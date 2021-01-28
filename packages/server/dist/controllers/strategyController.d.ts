import { Controller } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";
import { StrategyMetaData } from "../types";
export declare class StrategyController extends Controller {
    strategyService: StrategyService;
    getAllStrategyMetaData(): StrategyMetaData[];
    getStrategyByFilename(fileName: string): GetStrategyResult;
}

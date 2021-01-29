import { Controller } from "tsoa";
import { GetStrategyResult, StrategyService } from "../services";
import { StrategyMetaData, WriteStrategyOptions } from "../types";
export declare class StrategyController extends Controller {
    strategyService: StrategyService;
    getAllStrategies(): StrategyMetaData[];
    getStrategyByFilename(fileName: string): GetStrategyResult;
    writeStrategy(fileName: string, contents: WriteStrategyOptions): void;
}

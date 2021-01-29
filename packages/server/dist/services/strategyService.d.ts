import { Strategy } from "@algotia/core";
import { StrategyTemplateOptions, WriteStrategyOptions } from "../types";
import { StrategyMetaData } from "../types";
export interface GetStrategyResult {
    value: string;
    meta: StrategyMetaData;
}
export declare class StrategyService {
    private strategyDir;
    constructor();
    private outDir;
    private getPath;
    getMeta(fileName: string): StrategyMetaData;
    import(fileName: string, templateOptions: StrategyTemplateOptions): Promise<Strategy>;
    writeStrategy(fileName: string, { contents }: WriteStrategyOptions): void;
    getStrategy(fileName: string): GetStrategyResult;
    getAllStrategies(): StrategyMetaData[];
}

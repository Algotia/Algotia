import { Strategy } from "@algotia/core";
import { StrategyTemplateOptions } from "../types";
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
    write(fileName: string, contents: string): Promise<void>;
    getStrategy(fileName: string): GetStrategyResult;
}

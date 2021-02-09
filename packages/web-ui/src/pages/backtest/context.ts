import { createContext } from "react";
import {
    CreateBacktestResult,
    CreateBacktestOptions,
    Market,
    StrategyMetaData,
} from "@algotia/client";

export interface RequestResult extends CreateBacktestResult {
    options: CreateBacktestOptions;
    market: Market;
}

export type Strategy = { strategyPath: string };

export const BacktestContext = createContext<{
    requestResult: RequestResult | undefined;
    options: CreateBacktestOptions | undefined;
    strategyMeta: StrategyMetaData | undefined;
    strategyPath: string | undefined;
    loading: boolean;
}>({
    requestResult: undefined,
    options: undefined,
    strategyPath: undefined,
    strategyMeta: undefined,
    loading: false,
});

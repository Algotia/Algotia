import { CreateBacktestOptions, CreateBacktestResult } from "@algotia/client";
import { Market } from "ccxt";
import { createContext } from "react";

export interface RequestResult extends CreateBacktestResult {
    options: CreateBacktestOptions;
    market: Market;
}

export type Strategy = { strategyPath: string };

export const BacktestContext = createContext<{
    requestResult: RequestResult | undefined;
    strategyPath: string | undefined;
    loading: boolean;
}>({
    requestResult: undefined,
    strategyPath: undefined,
    loading: false,
});

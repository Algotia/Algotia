import { createContext } from "react";
import {
    CreateBacktestResult,
    CreateBacktestOptions,
    Market,
} from "@algotia/client";

export interface RequestResult extends CreateBacktestResult {
    options: CreateBacktestOptions;
    market: Market;
}

export type Strategy = { strategyPath: string };

export const BacktestContext = createContext<{
    requestResult: RequestResult | undefined;
    strategyPath: string | undefined;
    loading: boolean;
    highlightedCandle: number;
}>({
    requestResult: undefined,
    strategyPath: undefined,
    loading: false,
    highlightedCandle: 0,
});

import { BacktestResults, OHLCV } from "@algotia/core";
import { Market } from "ccxt";
import { createContext } from "react";

export interface RequestResult {
    candles: OHLCV[];
    results: BacktestResults;
    options: Options;
    market: Market;
}

export interface Options {
    exchange: string;
    period: string;
    pair: string;
    to: number;
    from: number;
    initialBalance: Record<string, number>;
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

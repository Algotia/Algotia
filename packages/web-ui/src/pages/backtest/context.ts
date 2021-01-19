import {BacktestResults, OHLCV} from "@algotia/core";
import {createContext} from "react";

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
    candles: OHLCV[] | undefined;
    results: BacktestResults | undefined;
    options: Options | undefined;
    strategyPath: string | undefined;
    loading: boolean;
}>({
    candles: undefined,
    results: undefined,
    options: undefined,
    strategyPath: undefined,
    loading: false,
});

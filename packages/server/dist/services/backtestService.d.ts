import { BacktestResults, ExchangeID, OHLCV_Candle } from "@algotia/core";
export interface CreateBacktestOptions {
    strategyPath: string;
    exchange: ExchangeID;
    period: string;
    pair: string;
    from: number;
    to: number;
    initialBalance: {
        [key: string]: number;
    };
}
export interface CreateBacktestResult {
    results: BacktestResults;
    candles: OHLCV_Candle[];
}
export declare class BacktestService {
    private exchangeService;
    private strategyService;
    create(options: CreateBacktestOptions): Promise<CreateBacktestResult>;
}

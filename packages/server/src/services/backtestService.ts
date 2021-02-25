import { backfill, backtest, simulateExchange } from "@algotia/core";
import {
    Strategy,
    BacktestResults,
    ExchangeIDs,
    OHLCV_Candle,
} from "@algotia/types";
import { strategyManager } from "../utils";
import { ExchangeService } from "./exchangeService";

export interface CreateBacktestOptions {
    strategyPath: string;
    exchange: ExchangeIDs;
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

export class BacktestService {
    private exchangeService = new ExchangeService();
    private strategyService = strategyManager;

    public async create(
        options: CreateBacktestOptions
    ): Promise<CreateBacktestResult> {
        const {
            exchange: exchangeId,
            from,
            to,
            period,
            pair,
            strategyPath,
            initialBalance,
        } = options;

        const realExchange = await this.exchangeService.getExchange(exchangeId);

        const simulated = simulateExchange({
            derivesFrom: realExchange,
            initialBalance,
        });

        const strategy: Strategy = await this.strategyService.importStrategy(
            strategyPath
        );

        const candles = await backfill({
            from,
            to,
            pair,
            period,
            exchange: simulated.exchange,
        });

        const results = await backtest({
            data: candles,
            strategy,
            simulatedExchange: simulated,
            backtestConstants: {
                period,
                pair,
            },
        });

        return {
            results,
            candles,
        };
    }
}

import {
    backfill,
    backtest,
    BacktestResults,
    ExchangeID,
    OHLCV_Candle,
    simulateExchange,
    AllowedExchangeIDs,
    Strategy,
} from "@algotia/core";
import { ExchangeService } from "./exchangeService";
import { StrategyService } from "./strategyService";
import node_path from "path";
import importFresh from "import-fresh";

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

export class BacktestService {
    private exchangeService = new ExchangeService();
    private strategyService = new StrategyService();

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

        const strategy: Strategy = await this.strategyService.import(
            strategyPath,
            {
                pair,
            }
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
        });

        return {
            results,
            candles,
        };
    }
}

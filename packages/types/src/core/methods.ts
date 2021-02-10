import {
	OHLCV_Candle,
	SimulatedExchangeResult,
	SimulatedExchangeStore,
} from "./exchange";
import { Strategy } from "./shared";

export interface BacktestOptions {
	simulatedExchange: SimulatedExchangeResult;
	data: OHLCV_Candle[];
	strategy: Strategy;
}

export interface BacktestResults {
	errors: SimulatedExchangeStore["errors"];
	openOrders: SimulatedExchangeStore["openOrders"];
	closedOrders: SimulatedExchangeStore["closedOrders"];
	balance: SimulatedExchangeStore["balance"];
}

export interface PaperTradeOptions {
	simulatedExchange: SimulatedExchangeResult;
	period: string;
	pair: string;
	pollingPeriod?: string;
	strategy: Strategy;
}

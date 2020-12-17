import { SimulatedExchangeStore, BacktestOptions } from "../types";

type BacktestResults = Omit<
	SimulatedExchangeStore,
	"currentTime" | "currentPrice"
>;

interface BacktestOptions {
	simulatedExchange: SimulatedExchangeResult;
	data: OHLCV[];
	strategy: Strategy;
}
/** Backtesting runs a strategy against historical data */
const backtest = async (options: BacktestOptions): Promise<BacktestResults> => {
	const { simulatedExchange, data, strategy } = options;
	const { fillOrders, updateContext, store, exchange } = simulatedExchange;

	for (let i = 0; i < data.length; i++) {
		const candle = data[i];

		if (i === data.length - 1) {
			fillOrders(candle);
			break;
		}

		const aheadCandle = data[i + 1];

		updateContext(aheadCandle.timestamp, aheadCandle.open);

		try {
			await strategy(exchange, candle);
		} catch (err) {
			store.errors.push(err.message);
		}

		fillOrders(aheadCandle);
	}

	const { balance, closedOrders, openOrders, errors } = store;

	return {
		balance,
		closedOrders,
		openOrders,
		errors,
	};
};

export default backtest;

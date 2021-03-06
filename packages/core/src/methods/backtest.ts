import { BacktestResults, BacktestOptions } from "@algotia/types";
import { createStrategyError } from "../utils";

/** Backtesting runs a strategy against historical data */
const backtest = async (options: BacktestOptions): Promise<BacktestResults> => {
	const { simulatedExchange, data, strategy, backtestConstants } = options;
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
			await strategy({
				exchange,
				data: candle,
				constants: {
					...backtestConstants,
					exchangeId: exchange.derviesFrom,
				},
			});
		} catch (err) {
			const formattedErr = createStrategyError({
				timestamp: candle.timestamp,
				message: err.message,
				balance: store.balance,
			});
			store.errors.push(formattedErr);
		} finally {
			fillOrders(aheadCandle);
		}
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

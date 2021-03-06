import {
	SimulatedExchangeStore,
	Exchange,
	Params,
	Trade,
} from "@algotia/types";

type FetchMyTrades = Exchange["fetchMyTrades"];

const createFetchMyTrades = (store: SimulatedExchangeStore): FetchMyTrades => {
	return async (
		_symbol?: string,
		_since?: string,
		_limit?: string,
		_params?: Params
	): Promise<Trade[]> => {
		try {
			const withTrades = store.closedOrders.filter((order) => {
				if (order.trades.length && order.trades.length > 0) {
					return order;
				}
			});

			let allTrades: Trade[] = [];

			for (const order of withTrades) {
				for (const trade of order.trades) {
					allTrades.push(trade);
				}
			}

			return allTrades;
		} catch (err) {
			throw err;
		}
	};
};

export default createFetchMyTrades;

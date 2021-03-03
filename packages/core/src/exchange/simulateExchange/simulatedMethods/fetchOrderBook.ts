import {
	Exchange,
	OrderBook,
	Params,
	SimulatedExchangeStore,
} from "@algotia/types";

type FetchOrderBook = Exchange["fetchOrderBook"];

const createFetchOrderBook = (
	store: SimulatedExchangeStore,
	derviedExchange?: Exchange
): FetchOrderBook => {
	if (derviedExchange) {
		return derviedExchange.fetchOrderBook;
	}
	return async (
		_symbol: string,
		_limit?: number,
		_params?: Params
	): Promise<OrderBook> => {
		return {
			nonce: 0,
			datetime: new Date(store.currentTime).toISOString(),
			timestamp: store.currentTime,
			asks: [],
			bids: [],
		};
	};
};

export default createFetchOrderBook;

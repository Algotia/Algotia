import {
	Exchange,
	Params,
	Order,
	SimulatedExchangeStore,
} from "@algotia/types";

type FetchOpenOrders = Exchange["fetchOpenOrders"];

const createFetchOpenOrders = (
	store: SimulatedExchangeStore
): FetchOpenOrders => {
	return async (
		_symbol?: string,
		_since?: number,
		_limit?: number,
		_params?: Params
	): Promise<Order[]> => {
		return store.openOrders;
	};
};

export default createFetchOpenOrders;

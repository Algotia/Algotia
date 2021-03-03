import {
	SimulatedExchangeStore,
	Exchange,
	Order,
	Params,
} from "@algotia/types";

type FetchOpenOrders = Exchange["fetchOpenOrders"];

const createFetchClosedOrders = (
	store: SimulatedExchangeStore
): FetchOpenOrders => {
	return async (
		_symbol?: string,
		_since?: number,
		_limit?: number,
		_params?: Params
	): Promise<Order[]> => {
		return store.closedOrders;
	};
};

export default createFetchClosedOrders;

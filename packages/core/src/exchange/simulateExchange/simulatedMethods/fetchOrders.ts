import {
	Exchange,
	Order,
	Params,
	SimulatedExchangeStore,
} from "@algotia/types";

type FetchOrders = Exchange["fetchOrders"];

const createFetchOrders = (store: SimulatedExchangeStore): FetchOrders => {
	return async (
		_symbol?: string,
		_since?: number,
		_limit?: number,
		_params?: Params
	): Promise<Order[]> => {
		return store.openOrders.concat(store.closedOrders);
	};
};

export default createFetchOrders;

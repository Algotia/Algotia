import { Exchange as CCXT_Exchange, Order, Params } from "@algotia/ccxt";
import { SimulatedExchangeStore } from "@algotia/types";

type FetchOrders = CCXT_Exchange["fetchOrders"];

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

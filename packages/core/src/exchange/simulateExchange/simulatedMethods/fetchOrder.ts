import { Exchange, Order, SimulatedExchangeStore } from "@algotia/types";

type FetchOrder = Exchange["fetchOrder"];

const createFetchOrder = (store: SimulatedExchangeStore): FetchOrder => {
	return async (id: string, symbol?: string): Promise<Order> => {
		const matchId = (order: Order) => {
			return order.id === id;
		};
		const openOrder = store.openOrders.find(matchId);
		if (openOrder) return openOrder;

		const closedOrder = store.closedOrders.find(matchId);
		if (closedOrder) return closedOrder;

		throw new Error(`Order with id ${id} not found`);
	};
};

export default createFetchOrder;

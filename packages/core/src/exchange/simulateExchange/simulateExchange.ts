import { createInitialBalance } from "../../utils";
import {
	SimulatedExchangeStore,
	SimulatedExchangeResult,
	SimulatedExchange,
	ExchangeID,
	Exchange,
	InitialBalance,
} from "../../types/";
import {
	createCancelOrder,
	createCreateOrder,
	createEditOrder,
	createFetchBalance,
	createFetchClosedOrders,
	createFetchMyTrades,
	createFetchOpenOrders,
	createFetchOrder,
	createFetchOrders,
} from "./simulatedMethods";
import {
	createFillOrders,
	createFlushStore,
	createUpdateContext,
} from "./controlMethods";
import createFetchOHLCV from "./simulatedMethods/fetchOHLCV";
import createFetchOrderBook from "./simulatedMethods/fetchOrderBook";

interface SimulatedExchangeOptions {
	initialBalance: InitialBalance;
	derivesFrom: Exchange;
}

const simulateExchange = (
	options: SimulatedExchangeOptions
): SimulatedExchangeResult => {
	const { initialBalance, derivesFrom } = options;

	let store: SimulatedExchangeStore = {
		currentTime: 0,
		currentPrice: 0,
		openOrders: [],
		closedOrders: [],
		errors: [],
		balance: createInitialBalance(initialBalance),
	};

	const exchange: SimulatedExchange = Object.assign({}, derivesFrom, {
		id: derivesFrom.id as ExchangeID,
		simulated: true as true,
		fetchOHLCV: createFetchOHLCV(derivesFrom),
		fetchOrderBook: createFetchOrderBook(store, derivesFrom),
		createOrder: createCreateOrder(store, derivesFrom.fees, derivesFrom),
		editOrder: createEditOrder(store, derivesFrom.fees),
		cancelOrder: createCancelOrder(store),
		fetchBalance: createFetchBalance(store),
		fetchOrder: createFetchOrder(store),
		fetchOrders: createFetchOrders(store),
		fetchOpenOrders: createFetchOpenOrders(store),
		fetchClosedOrders: createFetchClosedOrders(store),
		fetchMyTrades: createFetchMyTrades(store),
	});

	const fillOrders = createFillOrders(store);
	const updateContext = createUpdateContext(store);
	const flushStore = createFlushStore(store, initialBalance);

	return {
		exchange,
		store,
		updateContext,
		fillOrders,
		flushStore,
	};
};

export default simulateExchange;

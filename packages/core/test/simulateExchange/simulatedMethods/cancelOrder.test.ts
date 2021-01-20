import {
	simulatedExchanges,
	initialBalance,
	reset,
	initialBalanceSymbol,
} from "../../test-utils";
import Decimal from "decimal.js";
import { parsePair } from "../../../src/utils";

describe.each(simulatedExchanges)("cancelOrder", (simulatedExchange) => {
	afterEach(() => {
		reset();
	});

	const quote = parsePair(initialBalanceSymbol)[1];
	const orderSides = ["buy", "sell"] as const;
	const orderTypes = ["limit", "market"] as const;

	for (const orderType of orderTypes) {
		for (const orderSide of orderSides) {
			it(`should cancel ${orderType} ${orderSide} order`, async () => {
				const { exchange, updateContext, store } = simulatedExchange;

				updateContext(1000, 5);

				const order = await exchange.createOrder(
					initialBalanceSymbol,
					orderType,
					orderSide,
					1,
					3
				);

				expect(store.openOrders.length).toStrictEqual(1);
				expect(store.closedOrders.length).toStrictEqual(0);

				await exchange.cancelOrder(order.id);

				expect(store.balance[quote].free).toStrictEqual(
					new Decimal(initialBalance.BTC)
						.minus(order.fee.cost)
						.toNumber()
				);
				expect(store.balance[quote].used).toStrictEqual(0);

				expect(store.balance[quote].total).toStrictEqual(
					initialBalance.BTC - order.fee.cost
				);

				expect(store.openOrders.length).toStrictEqual(0);
				expect(store.closedOrders.length).toStrictEqual(1);
				expect(store.closedOrders[0].status).toStrictEqual("canceled");
			});
		}
	}

	it(`should throw error if order is filled`, async () => {
		const { exchange, updateContext, fillOrders } = simulatedExchange;

		updateContext(1000, 5);

		const order = await exchange.createOrder(
			initialBalanceSymbol,
			"limit",
			"buy",
			1,
			3
		);

		fillOrders({
			timestamp: 2000,
			open: 3,
			high: 3,
			low: 3,
			close: 3,
			volume: 1,
		});

		const failedCancel = exchange.cancelOrder(order.id);

		expect(Promise.resolve(failedCancel)).rejects.toThrow();
	});
});

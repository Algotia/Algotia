import Decimal from "decimal.js";
import { parsePair } from "../../../src/utils";
import {
	initialBalance,
	reset,
	initialBalanceSymbol,
	simulatedExchanges,
} from "../../test-utils";

const [base, quote] = parsePair(initialBalanceSymbol);

describe.each(simulatedExchanges)("edit order", (simulatedExchange) => {
	afterEach(() => {
		reset();
	});

	it(`should edit market order if not filled`, async () => {
		const {
			exchange,
			store,
			updateContext,
			fillOrders,
		} = simulatedExchange;

		expect(store.balance[quote].free).toStrictEqual(initialBalance[quote]);
		expect(store.balance[quote].used).toStrictEqual(0);

		updateContext(1000, 10);

		const originalOrder = await exchange.createOrder(
			initialBalanceSymbol,
			"market",
			"buy",
			1
		);

		const editedOrder = await exchange.editOrder(
			originalOrder.id,
			initialBalanceSymbol,
			"market",
			"buy",
			0.5
		);

		const filledCost = new Decimal(editedOrder.amount)
			.mul(editedOrder.price)
			.plus(editedOrder.fee.cost);

		expect(store.closedOrders.length).toStrictEqual(0);
		expect(store.openOrders.length).toStrictEqual(1);
		expect(store.openOrders[0].amount).toStrictEqual(0.5);

		expect(store.balance[quote].used).toStrictEqual(filledCost.toNumber());

		fillOrders({
			timestamp: 1000,
			open: 10,
			high: 10,
			low: 10,
			close: 10,
			volume: 10,
		});

		expect(store.openOrders.length).toStrictEqual(0);
		expect(store.closedOrders.length).toStrictEqual(1);

		expect(store.balance[base].free).toStrictEqual(
			new Decimal(initialBalance[base])
				.plus(editedOrder.amount)
				.toNumber()
		);

		expect(store.balance[quote].free).toStrictEqual(
			new Decimal(initialBalance[quote])
				.minus(store.closedOrders[0].trades[0].cost)
				.minus(store.closedOrders[0].trades[0].fee.cost)
				.minus(originalOrder.fee.cost)
				.toNumber()
		);
		expect(store.balance[quote].used).toStrictEqual(0);
		expect(store.balance[quote].total).toStrictEqual(
			new Decimal(initialBalance[quote])
				.minus(filledCost)
				.minus(originalOrder.fee.cost)
				.toNumber()
		);
	});

	it("should fail to edit a filled order", async () => {
		const {
			exchange,
			store,
			updateContext,
			fillOrders,
		} = simulatedExchange;

		updateContext(1000, 10);

		const order = await exchange.createOrder(
			initialBalanceSymbol,
			"market",
			"buy",
			1
		);

		const filledCost = new Decimal(order.price)
			.mul(order.amount)
			.plus(order.fee.cost);

		expect(store.balance[quote].free).toStrictEqual(
			new Decimal(initialBalance[quote]).minus(filledCost).toNumber()
		);

		expect(store.balance[quote].used).toStrictEqual(filledCost.toNumber());

		fillOrders({
			timestamp: 1000,
			open: 10,
			high: 10,
			low: 10,
			close: 10,
			volume: 10,
		});

		expect(store.closedOrders.length).toStrictEqual(1);
		expect(store.openOrders.length).toStrictEqual(0);

		expect(store.balance[base].free).toStrictEqual(
			initialBalance[base] + order.amount
		);

		expect(store.balance[quote].used).toStrictEqual(0);

		const editedOrder = exchange.editOrder(
			order.id,
			initialBalanceSymbol,
			"market",
			"buy",
			0.5
		);

		expect(editedOrder).rejects.toThrow();
	});
});

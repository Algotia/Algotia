import Decimal from "decimal.js";
import { createInitialBalance, parsePair } from "../../../src/utils";
import {
	simulatedExchanges,
	initialBalance,
	reset,
	initialBalanceSymbol,
} from "../../test-utils";

const [base, quote] = parsePair(initialBalanceSymbol);

describe.each(simulatedExchanges)("fetch balance", (simulatedExchange) => {
	afterEach(() => {
		reset();
	});
	it(`should fetch initial balance`, async () => {
		const { exchange } = simulatedExchange;

		const balance = await exchange.fetchBalance();
		const formattedIntialBalance = createInitialBalance(initialBalance);

		expect(balance).toStrictEqual(formattedIntialBalance);

		for (const currency in initialBalance) {
			expect(balance[currency].free).toStrictEqual(
				initialBalance[currency]
			);
		}
	});

	it(`should fetch balance after order is placed`, async () => {
		simulatedExchange.updateContext(1000, 10);

		const order = await simulatedExchange.exchange.createOrder(
			initialBalanceSymbol,
			"market",
			"buy",
			1
		);

		const balance = await simulatedExchange.exchange.fetchBalance();

		expect(balance[quote].free).toStrictEqual(
			new Decimal(initialBalance[quote])
				.minus(new Decimal(order.price).mul(order.amount))
				.minus(order.fee.cost)
				.toNumber()
		);

		expect(balance[quote].used).toStrictEqual(
			new Decimal(order.price)
				.mul(order.amount)
				.plus(order.fee.cost)
				.toNumber()
		);

		expect(balance[quote].total).toStrictEqual(initialBalance[quote]);
	});

	it(`should fetch balance after an order is filled`, async () => {
		simulatedExchange.updateContext(1000, 10);

		const order = await simulatedExchange.exchange.createOrder(
			initialBalanceSymbol,
			"market",
			"buy",
			1
		);

		simulatedExchange.fillOrders({
			timestamp: 1000,
			open: 10,
			high: 10,
			low: 10,
			close: 10,
			volume: 1,
		});

		const balance = await simulatedExchange.exchange.fetchBalance();

		expect(balance[quote].free).toStrictEqual(
			new Decimal(initialBalance[quote])
				.minus(new Decimal(order.price).mul(order.amount))
				.minus(order.fee.cost)
				.toNumber()
		);

		expect(balance[quote].used).toStrictEqual(0);

		expect(balance[quote].total).toStrictEqual(
			new Decimal(initialBalance[quote])
				.minus(new Decimal(order.price).mul(order.amount))
				.minus(order.fee.cost)
				.toNumber()
		);
	});
});

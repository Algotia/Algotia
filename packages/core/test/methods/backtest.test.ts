import { backtest } from "../../src/methods/";
import { simulatedExchanges, initialBalance, reset } from "../test-utils";
import Decimal from "decimal.js";

describe.each(simulatedExchanges)("backtest", (simulatedExchange) => {
	afterEach(() => {
		reset();
	});
	it(`should create an order every candle`, async () => {
		const candles = require("./__fixtures__/candles").default;

		const result = await backtest({
			simulatedExchange,
			data: candles,
			strategy: async ({ exchange, constants }) => {
				await exchange.createOrder(constants.pair, "market", "buy", 1);
			},
			backtestConstants: { pair: "ETH/BTC", period: "1h" },
		});

		expect(result.openOrders.length).toStrictEqual(0);
		expect(result.closedOrders.length).toStrictEqual(candles.length - 1);
		expect(result.errors.length).toStrictEqual(0);

		const totalCost = result.closedOrders.reduce(
			(a, b) => a + b.cost + b.fee.cost,
			0
		);

		const totalAmount = result.closedOrders.reduce(
			(a, b) => a + b.amount,
			0
		);

		expect(result.balance.BTC.free).toStrictEqual(
			initialBalance.BTC - totalCost
		);

		expect(result.balance.BTC.used).toStrictEqual(0);

		expect(result.balance.BTC.total).toStrictEqual(
			new Decimal(initialBalance.BTC).minus(totalCost).toNumber()
		);

		expect(result.balance.ETH.free).toStrictEqual(
			initialBalance.ETH + totalAmount
		);
		expect(result.balance.ETH.used).toStrictEqual(0);
		expect(result.balance.ETH.total).toStrictEqual(
			initialBalance.ETH + totalAmount
		);
	});

	it(`Should capture errors`, async () => {
		const candles = require("./__fixtures__/candles").default;

		const result = await backtest({
			simulatedExchange,
			data: candles,
			strategy: async ({ exchange, constants }) => {
				await exchange.createOrder(
					constants.pair,
					"market",
					"buy",
					1000
				);
			},
			backtestConstants: {
				pair: "ETH/BTC",
				period: "1h",
			},
		});

		expect(result.errors.length).toStrictEqual(candles.length - 1);

		for (const error of result.errors) {
			expect(typeof error).toStrictEqual("object");
			expect(error).toHaveProperty("timestamp");
			expect(error).toHaveProperty("message");
		}
	});
});

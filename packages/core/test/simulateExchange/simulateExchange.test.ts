import { simulateExchange, createExchange } from "../../src/algotia";
import {
	ExchangeIDs,
	SimulatedExchange,
	Exchange,
	Market,
	IDictionary,
} from "@algotia/types";

interface ExchangeObj {
	originalExchange: Exchange;
	derivedExchange: SimulatedExchange;
	exchangeId: ExchangeIDs;
}

describe("simulateExchange", () => {
	const exchangeId = ExchangeIDs.binance;
	it(`should be instance of Exchange`, () => {
		const realExchange = createExchange(exchangeId);

		const { exchange } = simulateExchange({
			initialBalance: {
				ETH: 100,
				BTC: 100,
			},
			derivesFrom: realExchange,
		});

		expect(exchange).toMatchObject(realExchange);
	});

	it("should have populated properties if dervies from real exchange", async () => {
		for (const exchangeId in ExchangeIDs) {
			const realExchange = createExchange(ExchangeIDs[exchangeId]);

			const markets: any = {
				"BTC/ETH": {},
				"ETH/BTC": {},
			};

			const currencies: any = { ETH: {}, BTC: {} };

			const loadMarketsSpy = jest
				.spyOn(realExchange, "loadMarkets")
				.mockImplementation(async function () {
					this.markets = markets as IDictionary<Market>;
					this.symbols = Object.keys(markets);
					this.currencies = currencies;
					return markets;
				});

			const { exchange } = simulateExchange({
				initialBalance: {
					ETH: 100,
					BTC: 100,
				},
				derivesFrom: realExchange,
			});

			await exchange.loadMarkets();

			expect(loadMarketsSpy).toHaveBeenCalledTimes(1);

			expect(exchange.markets).toStrictEqual(markets);

			expect(exchange.currencies).toStrictEqual(currencies);

			expect(exchange.symbols).toStrictEqual(
				Object.keys(exchange.markets)
			);
		}
	});
});

import { Exchange as CCXT_Exchange, IDictionary, Market } from "@algotia/ccxt";
import {
	simulateExchange,
	createExchange,
} from "../../src/algotia";
import {

	AllowedExchangeIDs,
	ExchangeID,
	SimulatedExchange,
} from "@algotia/types"

interface ExchangeObj {
	originalExchange: CCXT_Exchange;
	derivedExchange: SimulatedExchange;
	exchangeId: ExchangeID;
}

describe.each(AllowedExchangeIDs)("simulateExchange", (exchangeId) => {
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
		for (const exchangeId of AllowedExchangeIDs) {
			const realExchange = createExchange(exchangeId);

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

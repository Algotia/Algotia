import { createExchange, simulateExchange } from "../../src/algotia";
import { ExchangeIDs, SimulatedExchangeResult } from "@algotia/types";

export const initialBalance = {
	BTC: 100,
	ETH: 100,
} as const;

export const initialBalanceSymbol = "BTC/ETH";

export const simulatedExchanges = (() => {
	let exchanges: SimulatedExchangeResult[] = [];
	for (const key in ExchangeIDs) {
		exchanges.push(
			simulateExchange({
				initialBalance,
				derivesFrom: createExchange(ExchangeIDs[key]),
			})
		);
	}
	return exchanges;
})();

export const reset = () =>
	simulatedExchanges.forEach((exchange) => {
		exchange.flushStore();
	});

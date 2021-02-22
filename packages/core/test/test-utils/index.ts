import { createExchange, simulateExchange } from "../../src/algotia";
import { AllowedExchangeIDs } from "@algotia/types";

export const initialBalance = {
	BTC: 100,
	ETH: 100,
} as const;

export const initialBalanceSymbol = "BTC/ETH";

export const simulatedExchanges = AllowedExchangeIDs.map((exchangeId) => {
	const realExchange = createExchange(exchangeId);
	return simulateExchange({ initialBalance, derivesFrom: realExchange });
});

export const reset = () =>
	simulatedExchanges.forEach((exchange) => {
		exchange.flushStore();
	});

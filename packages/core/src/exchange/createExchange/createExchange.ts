import ccxt from "ccxt";
import { ExchangeID, isExchangeID } from "../../types";

const createExchange = (
	id: ExchangeID,
	params?: ConstructorParameters<typeof ccxt[ExchangeID]>
) => {
	if (isExchangeID(id)) {
		if (params) return new ccxt[id](...params);
		return new ccxt[id]();
	}
};

export default createExchange;

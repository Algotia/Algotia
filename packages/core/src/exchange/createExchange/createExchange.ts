import ccxt from "@algotia/ccxt";
import { ExchangeID } from "@algotia/types";
import { isExchangeID } from "../../utils";

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

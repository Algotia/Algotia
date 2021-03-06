import Ccxt from "@algotia/ccxt";
import { ExchangeIDs, Exchange } from "@algotia/types";

const createExchange = (
	id: ExchangeIDs,
	...params: ConstructorParameters<typeof Exchange>
) => {
	return new Ccxt[id](params ? params : {});
};

export default createExchange;

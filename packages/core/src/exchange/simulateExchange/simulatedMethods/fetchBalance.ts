import { Exchange as CCXT_Exchange } from "@algotia/ccxt";
import { SimulatedExchangeStore } from "@algotia/types";

type FetchBalance = CCXT_Exchange["fetchBalance"];

const createFetchBalance = (store: SimulatedExchangeStore): FetchBalance => {
	return async () => {
		return { ...store.balance };
	};
};

export default createFetchBalance;

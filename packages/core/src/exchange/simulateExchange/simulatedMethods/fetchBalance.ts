import { Balances, Exchange as CCXT_Exchange } from "@algotia/ccxt";
import { SimulatedExchangeStore } from "../../../types";

type FetchBalance = CCXT_Exchange["fetchBalance"];

const createFetchBalance = (store: SimulatedExchangeStore): FetchBalance => {
	return async () => {
		return { ...store.balance } as Balances;
	};
};

export default createFetchBalance;

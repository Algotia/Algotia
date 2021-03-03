import { Exchange } from "@algotia/types";
import { SimulatedExchangeStore } from "@algotia/types";

type FetchBalance = Exchange["fetchBalance"];

const createFetchBalance = (store: SimulatedExchangeStore): FetchBalance => {
	return async () => {
		return { ...store.balance };
	};
};

export default createFetchBalance;

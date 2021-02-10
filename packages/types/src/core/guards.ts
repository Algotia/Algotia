import { AllowedExchangeIDs, ExchangeID } from "./exchange";

const isExchangeID = (id: any): id is ExchangeID => {
	return AllowedExchangeIDs.includes(id);
};

export { isExchangeID };

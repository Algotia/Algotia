import { AllowedExchangeIDs, ExchangeID } from "@algotia/types";

const isExchangeID = (str: any): str is ExchangeID => {
	return AllowedExchangeIDs.includes(str);
};

export { isExchangeID };

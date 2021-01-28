import { SimulatedExchangeStore } from "../shared";

export interface StrategyError {
	timestamp: number;
	message: string;
	balance: SimulatedExchangeStore["balance"];
}

export const createStrategyError = (args: StrategyError): StrategyError => {
	return args;
};

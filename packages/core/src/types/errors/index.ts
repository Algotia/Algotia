import { Balances } from "@algotia/ccxt";

export interface StrategyError {
	timestamp: number;
	message: string;
	balance: Balances;
}

export const createStrategyError = (args: StrategyError): StrategyError => {
	return args;
};

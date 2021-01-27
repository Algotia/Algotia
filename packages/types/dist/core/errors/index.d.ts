import { Balances } from "ccxt";
export interface StrategyError {
    timestamp: number;
    message: string;
    balance: Balances;
}
export declare const createStrategyError: (args: StrategyError) => StrategyError;

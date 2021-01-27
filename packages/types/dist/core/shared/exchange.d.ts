import { Exchange, Order, Dictionary } from "ccxt";
import { StrategyError } from "../errors";
export interface Balance {
    free: number;
    used: number;
    total: number;
}
export interface Balances extends Record<string, Balance> {
    info: any;
}
export { Exchange, Dictionary };
export declare const AllowedExchangeIDs: readonly ["binance", "kucoin", "bitfinex"];
export declare type ExchangeID = typeof AllowedExchangeIDs[number];
export declare type InitialBalance = Record<string, number>;
export interface OHLCV {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
export interface SimulatedExchange extends InstanceType<typeof Exchange> {
    simulated: true;
    derviesFrom?: ExchangeID;
}
export interface SimulatedExchangeStore {
    currentTime: number;
    currentPrice: number;
    balance: Balances;
    openOrders: Order[];
    closedOrders: Order[];
    errors: StrategyError[];
}
export interface SimulatedExchangeResult {
    fillOrders: (candle: OHLCV) => void;
    updateContext: (time: number, price: number) => void;
    flushStore: () => void;
    store: SimulatedExchangeStore;
    exchange: SimulatedExchange;
}

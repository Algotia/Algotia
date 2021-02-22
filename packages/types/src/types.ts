import { Exchange, Order, Balances } from "@algotia/ccxt";

// Errors

export interface StrategyError {
    timestamp: number;
    message: string;
    balance: Balances;
}

export const createStrategyError = (args: StrategyError): StrategyError => {
    return args;
};

export interface StrategyArgs {
    exchange: Exchange | SimulatedExchange;
    data: OHLCV_Candle;
    constants: {
        pair: string;
        period: string;
        exchangeId: ExchangeID;
    };
}

// Strategy

export type Strategy = (args: StrategyArgs) => Promise<void> | void;

export interface StrategyMetaData {
    name: string;
    path: string;
    indexFile: string;
    language: SupportedStrategyLanguages;
}

export const editorLanguages = [
    "JavaScript",
    "TypeScript",
    "JSON",
    "Text",
] as const;

export type EditorLanguage = typeof editorLanguages[number];

export const supportedStrategyLanguages = ["JavaScript", "TypeScript"] as const;

export type SupportedStrategyLanguages = typeof supportedStrategyLanguages[number];

export interface StrategyTemplateOptions {
    pair: string;
}

export interface WriteStrategyOptions {
    path: string;
    contents?: string;
}

export interface StrategyFile {
    modifiedAt: number;
    path: string;
    basename: string;
    extension: string;
    contents: string;
    language?: EditorLanguage;
}

export type FileStructure = {
    name: string;
    id: string;
    fullPath: string;
    children?: FileStructure[];
    language?: EditorLanguage;
};

// Exchange

export const AllowedExchangeIDs = ["binance", "kucoin", "bitfinex"] as const;

export type ExchangeID = typeof AllowedExchangeIDs[number];

export type InitialBalance = Record<string, number>;

export interface OHLCV_Candle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export { Exchange };

export interface SimulatedExchange extends Exchange {
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
    fillOrders: (candle: OHLCV_Candle) => void;
    updateContext: (time: number, price: number) => void;
    flushStore: () => void;
    store: SimulatedExchangeStore;
    exchange: SimulatedExchange;
}
// Methods
export interface BackfillArgs {
    from: number;
    to: number;
    pair: string;
    period: string;
    exchange: Exchange | SimulatedExchange;
}

type BacktestConstants = Pick<BackfillArgs, "pair" | "period">;

export interface BacktestOptions {
    backtestConstants: BacktestConstants;
    simulatedExchange: SimulatedExchangeResult;
    data: OHLCV_Candle[];
    strategy: Strategy;
}

export interface BacktestResults {
    errors: SimulatedExchangeStore["errors"];
    openOrders: SimulatedExchangeStore["openOrders"];
    closedOrders: SimulatedExchangeStore["closedOrders"];
    balance: SimulatedExchangeStore["balance"];
}

export interface PaperTradeOptions {
    simulatedExchange: SimulatedExchangeResult;
    period: string;
    pair: string;
    pollingPeriod?: string;
    strategy: Strategy;
}

// Server

export interface ConfigOptions {
    port: number;
    appDir?: string;
}

// util

export type LooseDate = Date | string | number;

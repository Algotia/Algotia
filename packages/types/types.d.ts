declare module "@algotia/types" {
  import { Exchange, Order, Balances } from "@algotia/ccxt";

  export enum ExchangeIDs {
    binance = "binance",
    kucoin = "kucoin",
    bitfinex = "bitfinex",
  }

  export enum EditorLanguages {
    "JavaScript" = "JavaScript",
    "TypeScript" = "TypeScript",
    "JSON" = "JSON",
    "Text" = "Text",
  }

  export enum StrategyLanguages {
    "JavaScript" = "JavaScript",
    "TypeScript" = "TypeScript",
  }

  // Errors
  export interface StrategyError {
    timestamp: number;
    message: string;
    balance: Balances;
  }

  export interface StrategyArgs {
    exchange: Exchange | SimulatedExchange;
    data: OHLCV_Candle;
    constants: {
      pair: string;
      period: string;
      exchangeId: ExchangeIDs;
    };
  }

  // Strategy

  export type Strategy = (args: StrategyArgs) => Promise<void> | void;

  export interface StrategyMetaData {
    name: string;
    path: string;
    indexFile: string;
    language: StrategyLanguages;
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
    language?: EditorLanguages;
  }

  export type FileStructure = {
    name: string;
    id: string;
    fullPath: string;
    children?: FileStructure[];
    language?: EditorLanguages;
  };

  interface StrategyTemplate {
    default: string;
    [key: string]: string;
  }

  export type StrategyTemplates = Record<StrategyLanguages, StrategyTemplate>;

  // Exchange

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
    derviesFrom?: ExchangeIDs;
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
}

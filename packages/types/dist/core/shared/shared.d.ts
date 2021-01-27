import { Exchange, OHLCV, SimulatedExchange } from "./exchange";
export declare type LooseDate = Date | string | number;
export declare type Strategy = (exchange: Exchange | SimulatedExchange, data: OHLCV) => Promise<any> | any;

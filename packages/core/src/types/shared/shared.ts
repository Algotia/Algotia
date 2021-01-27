import { Exchange, OHLCV_Candle, SimulatedExchange } from "./exchange";

export type LooseDate = Date | string | number;

export type Strategy = (
	exchange: Exchange | SimulatedExchange,
	data: OHLCV_Candle
) => Promise<any> | any;

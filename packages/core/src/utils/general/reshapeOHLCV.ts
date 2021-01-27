import { OHLCV_Candle } from "../../types";

const reshapeOHLCV = (rawCandles: number[][]): OHLCV_Candle[] => {
	return rawCandles.map((ohlcv) => {
		return {
			timestamp: ohlcv[0],
			open: ohlcv[1],
			high: ohlcv[2],
			low: ohlcv[3],
			close: ohlcv[4],
			volume: ohlcv[5],
		};
	});
};

export default reshapeOHLCV;

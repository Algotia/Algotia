import { OHLCV_Candle } from "@algotia/types";

/** If no candles were returned (e.g.: downtime, no volume), fill period with last known candle prices, with timestamp value incremented to create continuous time series */
const fillEmptyCandles = (candles: OHLCV_Candle[], periodMs: number): OHLCV_Candle[] => {
	if (!candles) return [];

	let fullCandleSet: OHLCV_Candle[] = [];

	let timeCursor = candles[0].timestamp;

	// Recursively add candles for empty periods
	const addCandle = (candle1: OHLCV_Candle, candle2: OHLCV_Candle) => {
		fullCandleSet.push(candle1);
		timeCursor += periodMs;
		if (!candle2) {
			return;
		}
		if (candle1.timestamp !== candle2.timestamp - periodMs) {
			const dummyCandle: OHLCV_Candle = {
				timestamp: timeCursor,
				open: candle1.open,
				high: candle1.high,
				low: candle1.low,
				close: candle1.close,
				volume: candle1.volume,
			};
			addCandle(dummyCandle, candle2);
		}
	};

	for (let i = 0; i < candles.length; i++) {
		const thisCandle = candles[i];
		const aheadCandle = candles[i + 1];
		addCandle(thisCandle, aheadCandle);
	}

	return fullCandleSet;
};

export default fillEmptyCandles;

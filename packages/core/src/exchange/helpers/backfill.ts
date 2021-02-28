import { BackfillArgs, OHLCV_Candle } from "@algotia/types";
import { parsePeriod, reshapeOHLCV } from "../../utils/";
import fillEmptyCandles from "./fillEmptyCandles";

/** Wrapper around the CCXT method fetchOHLCV. It handles pagination and filling periods where no candles were returned with dummy candles. */
const backfill = async (args: BackfillArgs): Promise<OHLCV_Candle[]> => {
	const { from, to, pair, period, exchange } = args;
	const { periodMs } = parsePeriod(period);

	let recordsToFetch = Math.ceil((to - from) / periodMs);
	let candles: OHLCV_Candle[] = [];
	let timeCursor = from;
	let page = 0;

	while (recordsToFetch > 0) {
		if (page) {
			// Sleep to avoid getting rate limited
			await new Promise((resolve) =>
				setTimeout(resolve, exchange.rateLimit)
			);
		}

		// Fetch records from exchange
		const rawOHLCV = await exchange.fetchOHLCV(
			pair,
			period,
			timeCursor,
			recordsToFetch
		);

		const ohlcv = reshapeOHLCV(rawOHLCV);

		const completeOHLCV = fillEmptyCandles(ohlcv, periodMs);

		recordsToFetch -= completeOHLCV.length;

		const lastTimestamp = completeOHLCV[completeOHLCV.length - 1].timestamp;

		timeCursor = lastTimestamp + periodMs;

		page++;

		candles.push(...completeOHLCV);
	}

	return candles;
};

export default backfill;

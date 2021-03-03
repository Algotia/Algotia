import { Exchange, OHLCV } from "@algotia/types";

type FetchOHLCV = Exchange["fetchOHLCV"];

const createFetchOHLCV = (derviedExchange?: Exchange): FetchOHLCV => {
	if (derviedExchange) {
		return derviedExchange.fetchOHLCV;
	}
	return async (
		_symbol: string,
		_timeframe: string,
		_since: number,
		_limit: number
	): Promise<OHLCV[]> => {
		try {
			return [];
		} catch (err) {
			throw err;
		}
	};
};

export default createFetchOHLCV;

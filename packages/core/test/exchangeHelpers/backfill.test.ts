import { parsePeriod } from "../../src/utils";
import { backfill } from "../../src/exchange/helpers";
import { initialBalanceSymbol, simulatedExchanges } from "../test-utils";
import { OHLCV } from "@algotia/types";

jest.mock("../../src/exchange/helpers/fillEmptyCandles", () => {
	const actual = jest.requireActual(
		"../../src/exchange/helpers/fillEmptyCandles"
	).default;
	return jest.fn().mockImplementation(actual);
});

jest.mock(
	"../../src/exchange/simulateExchange/simulatedMethods/fetchOHLCV",
	() => {
		const parsePeriod = jest.requireActual("../../src/utils").parsePeriod;
		const roundTime = jest.requireActual("../../src/utils").roundTime;
		return () => {
			return async (
				_: string,
				timeframe: string,
				since: number,
				limit: number
			): Promise<OHLCV[]> => {
				const { periodMs } = parsePeriod(timeframe);
				const nearestCandleToSince = roundTime(
					new Date(since),
					periodMs,
					"ceil"
				).getTime();

				let candles: OHLCV[] = [];
				let timeCursor = nearestCandleToSince;

				for (let i = 0; i < limit; i++) {
					const candle: OHLCV = [timeCursor, 1, 1, 1, 1, 1];
					candles.push(candle);
					timeCursor += periodMs;
				}

				// Remove up to 10% of candles
				const randomNum = Math.floor(Math.random() * (limit * 0.1));

				// Removes random candles from the result, for the backfill helper to
				// fill with dummy candles
				for (let i = 0; i < randomNum; i++) {
					const randomIndex = Math.floor(Math.random() * limit) + 1;
					candles.splice(randomIndex, 1);
				}
				return candles;
			};
		};
	}
);

const checkCandlesAreContinuous = (
	candles: any[],
	period: string,
	expectedSince: number
) => {
	const { periodMs } = parsePeriod(period);

	for (let i = 0; i < candles.length; i++) {
		const thisCandle = candles[i];

		if (i === 0) {
			expect(thisCandle.timestamp).toStrictEqual(expectedSince);
			continue;
		}

		const lastCandle = candles[i - 1];

		expect(lastCandle.timestamp).toStrictEqual(
			thisCandle.timestamp - periodMs
		);
	}
};

const backfillArgs = [
	{
		title: "Short backfill (no pagination)",
		from: new Date("1/1/2020 12:00 AM GMT").getTime(),
		to: new Date("1/2/2020 12:00 AM GMT").getTime(),
		timeframe: "1h",
	},
	{
		title: "Long backfill (pagination)",
		from: new Date("1/1/2020 12:00 PM GMT").getTime(),
		to: new Date("1/4/2020 12:00 AM GMT").getTime(),
		timeframe: "1m",
	},
];

describe("backfill", () => {
	for (const exchange of simulatedExchanges) {
		for (const args of backfillArgs) {
			test(args.title + " - " + exchange.exchange.name, async () => {
				const { from, to, timeframe } = args;
				const candles = await backfill({
					from,
					to,
					exchange: exchange.exchange,
					pair: initialBalanceSymbol,
					period: timeframe,
				});

				expect(
					require("../../src/exchange/helpers/fillEmptyCandles")
				).toHaveBeenCalled();

				checkCandlesAreContinuous(candles, timeframe, from);
			});
		}
	}
});

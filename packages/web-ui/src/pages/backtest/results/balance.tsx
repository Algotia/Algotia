import { BacktestResults, OHLCV, parsePair } from "@algotia/core";
import { FC } from "react";
import { Options } from "../context";
import { ColDef, DataGrid } from "@material-ui/data-grid";

const getPercentage = (
    initial: number,
    final: number,
    currency: string
): string => {
    if (initial === 0) {
        if (final === 0) return 0 + "%";
        return "+ " + final.toFixed(4) + " " + currency;
    }
    const percentage = ((final - initial) / initial) * 100;

    return percentage.toFixed(4) + " %";
};
const getTotalRow = (
    candles: OHLCV[],
    options: Options,
    results: BacktestResults
) => {
    const [base, quote] = parsePair(options.pair);

    const firstCandleOpen = candles[0].open;
    const lastCandleClose = candles[candles.length - 1].close;

    const initialBaseValueInQuote =
        options.initialBalance[base] * firstCandleOpen;
    const finalBaseValueInQuote = results.balance[base].total * lastCandleClose;

    const initialQuoteValue = options.initialBalance[quote];
    const finalQuoteValue = results.balance[quote].total;

    const totalInitialValue = initialBaseValueInQuote + initialQuoteValue;

    const totalFinalValue = finalBaseValueInQuote + finalQuoteValue;

    const totalPercentChange = getPercentage(
        totalInitialValue,
        totalFinalValue,
        quote
    );

    const gains = totalFinalValue > totalInitialValue && totalPercentChange;

    const losses = totalFinalValue < totalInitialValue && totalPercentChange;

    const totalRow = {
        id: "total",
        currency: "Total",
        change: gains || losses || 0,
        initial: totalInitialValue.toFixed(4),
        final: totalFinalValue.toFixed(4),
    };
    return totalRow;
};

const getCurrencyRows = (options: Options, results: BacktestResults) => {
    return Object.keys(options.initialBalance).map((currency) => {
        const initialAmount = options.initialBalance[currency];
        const finalAmount = results.balance[currency].total;

        const percentage = getPercentage(initialAmount, finalAmount, currency);

        const gains = finalAmount > initialAmount && percentage;

        const losses = finalAmount < initialAmount && percentage;

        return {
            id: currency,
            currency,
            change: gains || losses || 0,
            initial: initialAmount.toFixed(4),
            final: finalAmount.toFixed(4),
        };
    });
};

const getRows = (
    options: Options,
    results: BacktestResults,
    candles: OHLCV[]
) => {
    return [
        ...getCurrencyRows(options, results),
        getTotalRow(candles, options, results),
    ];
};

const columns: ColDef[] = [
    { field: "currency", headerName: "Currency", flex: 1, },
    { field: "initial", headerName: "Initial", flex: 1 },
    { field: "change", headerName: "Change", flex: 1 },
    { field: "final", headerName: "Final", flex: 1 },
];

const Balance: FC<{
    results: BacktestResults | undefined;
    options: Options | undefined;
    candles: OHLCV[] | undefined;
}> = (props) => {
    const { results, options, candles } = props;

    const rows =
        results && candles && options && getRows(options, results, candles);

    return (
        <DataGrid
            columns={columns}
            rows={rows || []}
            hideFooter={true}
            density="compact"
        />
    );
};

export default Balance;

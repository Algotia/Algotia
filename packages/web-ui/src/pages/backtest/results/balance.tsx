import { parsePair } from "@algotia/core";
import { FC, useContext } from "react";
import { BacktestContext, RequestResult } from "../context";
import { ColDef, DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

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

const Wrapper = styled.div`
    height: 100%;
`;

const getTotalRow = (requestResult: RequestResult) => {
    const { market, options, candles, results } = requestResult;

    const precision = market.precision.quote || 2;
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
        initial: totalInitialValue.toFixed(precision),
        final: totalFinalValue.toFixed(precision),
    };
    return totalRow;
};

const getCurrencyRows = (requestResult: RequestResult) => {
    const { options, market, results } = requestResult;
    const [base, quote] = parsePair(options.pair);

    return Object.keys(options.initialBalance).map((currency) => {
        let precision = 4;

        if (currency === quote) {
            precision = market.precision.quote || 2;
        }

        if (currency === base) {
            precision = market.precision.base || 2;
        }

        const initialAmount = options.initialBalance[currency];
        const finalAmount = results.balance[currency].total;

        const percentage = getPercentage(initialAmount, finalAmount, currency);

        const gains = finalAmount > initialAmount && percentage;

        const losses = finalAmount < initialAmount && percentage;

        return {
            id: currency,
            currency,
            change: gains || losses || 0,
            initial: initialAmount.toFixed(precision),
            final: finalAmount.toFixed(precision),
        };
    });
};

const getRows = (requestResult: RequestResult) => {
    return [...getCurrencyRows(requestResult), getTotalRow(requestResult)];
};

const columns: ColDef[] = [
    { field: "currency", headerName: "Currency", flex: 1 },
    { field: "initial", headerName: "Initial", flex: 1 },
    {
        field: "change",
        headerName: "Change",
        flex: 1,
        // renderCell: (props) => {
        //     const value = props.row["change"];
        //     const color =
        //         typeof value === "string" && value.startsWith("-")
        //             ? "red"
        //             : "green";
        //
        //     return <p style={color && { color }}>{value}</p>;
        // },
    },
    { field: "final", headerName: "Final", flex: 1 },
];

const useDataGridStyles = makeStyles({
    root: {
        color: "#fff",
        backgroundColor: "#444",
    },
});
const Balance: FC = () => {
    const { requestResult } = useContext(BacktestContext);

    const rows = requestResult && getRows(requestResult);

    const dataGridClasses = useDataGridStyles();

    return (
        <Wrapper>
            <DataGrid
                className={dataGridClasses.root}
                columns={columns}
                rows={rows || []}
                hideFooter={true}
                density="compact"
            />
        </Wrapper>
    );
};

export default Balance;

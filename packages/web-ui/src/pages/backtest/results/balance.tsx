import { BacktestResults, OHLCV, parsePair } from "@algotia/core";
import { FC } from "react";
import { Options } from "../backtest";
import styled from "styled-components";
import { Column } from "../../../components";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

const Wrapper = styled(Column)`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const Balance: FC<{
    results: BacktestResults;
    options: Options;
    candles: OHLCV[];
}> = (props) => {
    const { results, options, candles } = props;

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

    const rows = Object.keys(options.initialBalance).map((currency) => {
        const initialAmount = options.initialBalance[currency];
        const finalAmount = results.balance[currency].total;

        const percentage = getPercentage(initialAmount, finalAmount, currency);

        const gains = finalAmount > initialAmount && percentage;

        const losses = finalAmount < initialAmount && percentage;

        return {
            currency,
            change: gains || losses || 0,
            color: gains ? "green" : losses ? "red" : "yellow",
            initial: initialAmount.toFixed(4),
            final: finalAmount.toFixed(4),
        };
    });

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

    return (
        <Wrapper>
            <TableContainer component="div">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Currency</TableCell>
                            <TableCell>Initial</TableCell>
                            <TableCell>Final</TableCell>
                            <TableCell>% Changed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.currency}>
                                <TableCell component="th" scope="row">
                                    {row.currency}
                                </TableCell>
                                <TableCell>{row.initial}</TableCell>
                                <TableCell>{row.final}</TableCell>
                                <TableCell style={{ color: row.color }}>
                                    {row.change}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow key="total">
                            <TableCell component="th" scope="row">
                                Total ({quote})
                            </TableCell>
                            <TableCell>
                                {totalInitialValue.toFixed(4)}
                            </TableCell>
                            <TableCell>{totalFinalValue.toFixed(4)}</TableCell>
                            <TableCell
                                style={{
                                    color: losses
                                        ? "red"
                                        : gains
                                        ? "green"
                                        : "yellow",
                                }}
                            >
                                {totalPercentChange}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Wrapper>
    );
};

export default Balance;

import { BacktestResults, OHLCV } from "@algotia/core";
import { FC } from "react";
import styled from "styled-components";
import { Column } from "../../../components";
import { Options } from "../backtest";
import ResultsTable from "./table";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
`;

const Body = styled(Column)`
    height: 100%;
    width: 100%;
    margin: 0 auto;
`;

const Results: FC<{
    results: BacktestResults | undefined;
    candles: OHLCV[] | undefined;
    options: Options | undefined;
}> = ({ results, options, candles }) => {
    return (
        <Wrapper>
            <Body>
                {results && options && candles ? (
                    <ResultsTable
                        results={results}
                        options={options}
                        candles={candles}
                    />
                ) : (
                    <div> no data yet </div>
                )}
            </Body>
        </Wrapper>
    );
};
export default Results;

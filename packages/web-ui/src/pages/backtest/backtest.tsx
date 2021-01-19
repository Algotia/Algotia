import React, { FC, useEffect, useState, createContext } from "react";
import styled from "styled-components";
import Editor from "./editor";
import Form from "./form";
import Results from "./results/";
import Chart from "./chart";
import { Backdrop, CircularProgress, Paper } from "@material-ui/core";
import { BacktestResults, OHLCV } from "@algotia/core";
import { Options, Strategy, BacktestContext } from "./context";

const Wrapper = styled(Paper)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
`;

const TopLeft = styled.div`
    grid-area: 1 / 1 / 3 / 4;
`;

const BottomLeft = styled.div`
    grid-area: 3 / 1 / 6 / 4;
`;

const TopRight = styled.div`
    grid-area: 1 / 4 / 3 / 6;
`;

const BottomRight = styled.div`
    grid-area: 3 / 4 / 6 / 6;
`;

const BacktestPage: FC = () => {
    const [candles, setCandles] = useState<OHLCV[]>();
    const [results, setResults] = useState<BacktestResults>();
    const [options, setOptions] = useState<Options>();
    const [strategyPath, setStraegyPath] = useState<string>();
    const [loading, setLoading] = useState(false);

    const run = (body: Options & Strategy) => {
        setLoading(true);
        fetch("/api/backtest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.errors) {
                    return alert(JSON.stringify(res.errors));
                }
                setCandles(res.candles);
                setResults(res.results);
            })
            .catch((err) => {
                alert(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (options && strategyPath) {
            const body = {
                ...options,
                strategyPath,
            };
            run(body);
        }
    }, [options]);

    return (
        <BacktestContext.Provider
            value={{
                candles,
                results,
                options,
                strategyPath,
                loading,
            }}
        >
            <Wrapper>
                <Backdrop style={{ zIndex: 1000 }} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <TopLeft>
                    <Chart />
                </TopLeft>
                <TopRight>
                    <Results />
                </TopRight>
                <BottomLeft>
                    <Editor setStraegyPath={setStraegyPath} />
                </BottomLeft>
                <BottomRight>
                    <Form setOptions={setOptions} />
                </BottomRight>
            </Wrapper>
        </BacktestContext.Provider>
    );
};

export default BacktestPage;

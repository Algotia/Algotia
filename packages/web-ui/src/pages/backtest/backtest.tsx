import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Editor from "./editor";
import Form from "./form";
import Results from "./results/";
import Chart from "./chart";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Options, BacktestContext, RequestResult } from "./context";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    box-sizing: border-box;
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
    const [requestResult, setRequestResult] = useState<RequestResult>();
    const [options, setOptions] = useState<Options>();
    const [strategyPath, setStraegyPath] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (options) {
            let result: RequestResult;

            const body = {
                ...options,
                strategyPath,
            };

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
                        alert(res.errors);
                        console.log(res.errors);
                    }
                    result = {
                        ...result,
                        candles: res.candles,
                        results: res.results,
                        options,
                    };
                })
                .catch((err) => {
                    alert(err);
                })
                .then(() => {
                    fetch(
                        `/api/exchange?id=${options.exchange}&market=${options.pair}`
                    )
                        .then((res) => res.json())
                        .then((json) => {
                            if (json.market) {
                                result = {
                                    ...result,
                                    market: json.market,
                                };
                            } else if (json.errors) {
                                alert(json.errors);
                            }
                        })
                        .catch((err) => {
                            alert(err);
                        })
                        .then(() => {
                            setRequestResult(result);
                        });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [options]);

    return (
        <BacktestContext.Provider
            value={{
                requestResult,
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

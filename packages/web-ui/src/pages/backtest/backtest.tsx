import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Editor from "./editor";
import Form from "./form";
import Results from "./results/";
import Chart from "./chart";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { BacktestContext, RequestResult } from "./context";
import { CreateBacktestOptions, DefaultApi } from "@algotia/client";

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
    const [options, setOptions] = useState<
        Omit<CreateBacktestOptions, "strategyPath">
    >();
    const [strategyPath, setStraegyPath] = useState<string>();
    const [loading, setLoading] = useState(false);

    const client = new DefaultApi();

    useEffect(() => {
        if (options && strategyPath) {
            let result: RequestResult;

            const body = {
                ...options,
                strategyPath,
            };

            setLoading(true);
            client.createBacktest(body).then(({ data: backtestResult }) => {
                client
                    .getMarket(body.exchange, body.pair)
                    .then(({ data: market }) => {
                        result = {
                            ...backtestResult,
                            options: body,
                            market,
                        };
                        setRequestResult(result);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
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

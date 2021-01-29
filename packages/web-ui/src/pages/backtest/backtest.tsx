import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Editor from "./editor";
import Results from "./results/";
import Chart from "./chart";
import { Backdrop, CircularProgress, Paper } from "@material-ui/core";
import { BacktestContext, RequestResult } from "./context";
import { CreateBacktestOptions, DefaultApi } from "@algotia/client";
import Form from "./form";

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    box-sizing: border-box;
`;

const TopLeft = styled.div`
    grid-area: 1 / 1 / 5 / 7;
`;

const BottomLeft = styled.div`
    grid-area: 5 / 1 / 11 / 7;
`;

const RightHalf = styled.div`
    grid-area: 1 / 7 / 11 / 11;
`;

const FormAndResults = styled(Paper)`
    && {
        height: 100%;
        box-sizing: border-box;
        padding: 15px;
        overflow-y: auto;
    }
`;

const client = new DefaultApi();

const BacktestPage: FC = () => {
    const [requestResult, setRequestResult] = useState<RequestResult>();
    const [options, setOptions] = useState<
        Omit<CreateBacktestOptions, "strategyPath">
    >();
    const [strategyPath, setStraegyPath] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (options && strategyPath) {
            const backtestOptions = {
                ...options,
                strategyPath,
            };
            setLoading(true);
            client
                .createBacktest({ ...options, strategyPath })
                .then((backtestResult) => {
                    client
                        .getMarket(options.exchange, options.pair)
                        .then((marketResult) => {
                            setRequestResult({
                                ...backtestResult.data,
                                market: marketResult.data,
                                options: backtestOptions,
                            });
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
                <BottomLeft>
                    <Editor setStraegyPath={setStraegyPath} />
                </BottomLeft>
                <RightHalf>
                    <FormAndResults>
                        <Results />
                        <Form setOptions={setOptions} />
                    </FormAndResults>
                </RightHalf>
            </Wrapper>
        </BacktestContext.Provider>
    );
};

export default BacktestPage;

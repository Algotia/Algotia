import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Results from "./results/";
import Chart from "./chart/";
import {
    Backdrop,
    CircularProgress,
    Paper,
    styled as muiStyled,
} from "@material-ui/core";
import { BacktestContext, RequestResult } from "./context";
import {
    CreateBacktestOptions,
    DefaultApi,
	ExchangeID,
    StrategyMetaData,
} from "@algotia/client";
import Form from "./form";
import { StrategyEditor } from "../../components";

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

const FormAndResults = muiStyled(Paper)(() => ({
    height: "100%",
    padding: "15px",
    overflowY: "auto",
}));

const client = new DefaultApi();

const BacktestPage: FC = () => {
    const [requestResult, setRequestResult] = useState<RequestResult>();
    const [options, setOptions] = useState<CreateBacktestOptions>();
    const [loading, setLoading] = useState(false);
    const [strategyPath, setStrategyPath] = useState<string>();
    const [strategyMeta, setStrategyMeta] = useState<StrategyMetaData>();
    const [editorValue, setEditorValue] = useState<string>();

    useEffect(() => {
        if (options) {
            setLoading(true);
            client
                .createBacktest(options)
                .then((backtestResult) => {
                    client
                        .getMarket(options.exchange, options.pair)
                        .then((marketResult) => {
                            setRequestResult({
                                ...backtestResult.data,
                                market: marketResult.data,
                                options,
                            });
                        });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [options]);

    useEffect(() => {
        if (strategyPath) {
            client
                .getStrategyByFilename(strategyPath)
                .then(({ data }) => {
                    setStrategyMeta(data.meta);
                    setEditorValue(data.value);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [strategyPath]);

    return (
        <BacktestContext.Provider
            value={{
                requestResult,
                options,
                loading,
                strategyMeta,
                strategyPath,
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
                    <StrategyEditor
                        onStrategySaved={() => {}}
                        editorValue={editorValue}
                        strategyMeta={strategyMeta}
                    />
                </BottomLeft>
                <RightHalf>
                    <FormAndResults>
                        <Results />
                        <Form
                            setOptions={setOptions}
                            setStrategyPath={setStrategyPath}
							strategyPath={strategyPath}
                        />
                    </FormAndResults>
                </RightHalf>
            </Wrapper>
        </BacktestContext.Provider>
    );
};

export default BacktestPage;

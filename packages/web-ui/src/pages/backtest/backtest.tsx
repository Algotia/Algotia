import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Editor from "./editor";
import Form from "./form";
import Results from "./results/";
import Chart from "./chart";
import { Paper } from "@material-ui/core";
import { BacktestResults, OHLCV } from "@algotia/core";

const Wrapper = styled(Paper)`
    width: 100%;
    height: 100%;
    display: flex;
`;

const Left = styled.div`
    height: 100%;
    width: 65%;
`;

const Right = styled.div`
    height: 100%;
    width: 35%;
`;

const Top = styled.div`
    width: 100%;
    height: 40%;
`;
const Bottom = styled.div`
    width: 100%;
    height: 60%;
`;

export interface Options {
    exchange: string;
    period: string;
    pair: string;
    to: number;
    from: number;
    initialBalance: Record<string, number>;
}

type Strategy = { strategyPath: string };

const BacktestPage: React.FC = () => {
    const [candles, setCandles] = useState<OHLCV[]>();
    const [results, setResults] = useState<BacktestResults>();
    const [options, setOptions] = useState<Options>();
    const [strategyPath, setStraegyPath] = useState<string>();

    const run = (body: Options & Strategy) => {
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
                setCandles(res.candles);
                setResults(res.results);
                console.log(res);
            })
            .catch((err) => {
                alert(err);
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
        <Wrapper>
            <Left id="chart-parent">
                <Top>
                    <Chart candles={candles} />
                </Top>
                <Bottom>
                    <Editor setStraegyPath={setStraegyPath} />
                </Bottom>
            </Left>
            <Right>
                <Top>
                    <Results
                        results={results}
                        candles={candles}
                        options={options}
                    />
                </Top>
                <Bottom>
                    <Form setOptions={setOptions} strategy={strategyPath} />
                </Bottom>
            </Right>
        </Wrapper>
    );
};

export default BacktestPage;

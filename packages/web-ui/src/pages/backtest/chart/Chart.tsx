import { Typography } from "@material-ui/core";
import { Chart as KChart, dispose, init, KLineData } from "klinecharts";
import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "../../../components";
import { BacktestContext } from "../context";
import CandleChart from "./BaseChart";
import SideBar from "./SideBar";
import { addOrderAnnotations } from "./utils";

const Wrapper = styled(Row)`
    height: 100%;
    width: 100%;
    position: relative;
`;

const NoDataContainer = styled(Row)`
    position: absolute;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Chart = () => {
    const backtestContext = useContext(BacktestContext);

    const [chart, setChart] = useState<KChart | null>(null);

    useEffect(() => {
        const chart = init("backtest-chart");
        if (chart) {
            chart.applyNewData(backtestContext.requestResult?.candles || []);
            chart.setStyleOptions({
                candle: {
                    tooltip: {
                        showType: "standard",
                        showRule: "always",
                        labels: ["Open", "Close", "Change %"],
                        values: (kLineData: KLineData) => {
                            const change =
                                ((kLineData.close - kLineData.open) /
                                    kLineData.open) *
                                100;
                            return [
                                { value: kLineData.open.toFixed(2) },
                                { value: kLineData.close.toFixed(2) },
                                {
                                    value: `${change.toFixed(2)}%`,
                                    color: change < 0 ? "#EF5350" : "#26A69A",
                                },
                            ];
                        },
                    },
                    priceMark: {
                        high: {
                            show: false,
                        },
                        low: {
                            show: false,
                        },
                        last: {
                            show: false,
                        },
                    },
                },
                crosshair: {
                    horizontal: {
                        line: {
                            show: false,
                        },
                    },
                    vertical: {
                        line: {
                            show: false,
                        },
                    },
                },
            });
            addOrderAnnotations(
                chart,
                backtestContext.requestResult?.results.closedOrders,
                backtestContext.requestResult?.results.errors
            );
            setChart(chart);
        }
        return () => {
            dispose("backtest-chart");
        };
    }, [backtestContext]);
    return (
        <Wrapper>
            <SideBar chart={chart} disabled={!backtestContext.requestResult} />
            <CandleChart chart={chart} />
            {!backtestContext.requestResult && (
                <NoDataContainer>
                    <Typography variant="h3" color="textSecondary">
                        No Data
                    </Typography>
                </NoDataContainer>
            )}
        </Wrapper>
    );
};

export default Chart;

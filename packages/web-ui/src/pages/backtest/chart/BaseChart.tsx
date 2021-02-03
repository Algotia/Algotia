import { Chart } from "klinecharts";
import { FC, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { styled as muiStyled } from "@material-ui/core";
import { BacktestContext } from "../context";


const ChartDiv = muiStyled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
	width: "100%",
	height: "100%"
}));

const CandleChart: FC<{
    chart: Chart | null;
}> = () => {
    return <ChartDiv id="backtest-chart" />;
};

export default CandleChart;

import { BacktestResults, OHLCV } from "@algotia/core";
import { Component, FC } from "react";
import {
    CandlestickSeries,
    Chart,
    ChartCanvas,
    discontinuousTimeScaleProviderBuilder,
    XAxis,
    YAxis,
    withSize,
    withDeviceRatio,
    WithSizeProps,
} from "react-financial-charts";
import { group } from "d3-array";
import { ScaleContinuousNumeric, ScaleTime } from "d3-scale";

interface ChartProps extends WithSizeProps {
    readonly candles?: OHLCV[];
    readonly ratio: number;
}

class ResultChart extends Component<ChartProps> {
    private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };
    private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d: OHLCV) => new Date(d.timestamp)
    );

    public render() {
        const { candles: initialData, height, width } = this.props;

        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = this.xScaleProvider(initialData || []);

        const max = xAccessor(data[data.length - 1]);
        const min = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [min, max];

        return (
            <ChartCanvas
                height={height}
                width={width}
                ratio={1}
                margin={this.margin}
                data={data}
                displayXAccessor={displayXAccessor}
                seriesName="Data"
                xScale={xScale}
                xAccessor={xAccessor}
                xExtents={xExtents}
            >
                <Chart id={1} yExtents={this.yExtents}>
                    <CandlestickSeries />
                    <XAxis />
                    <YAxis />
                </Chart>
            </ChartCanvas>
        );
    }

    private readonly yExtents = (data: OHLCV) => {
        return [data.high, data.low];
    };
}

export default withSize({ style: { width: "100%", height: "100%" } })(
    withDeviceRatio()(ResultChart)
);

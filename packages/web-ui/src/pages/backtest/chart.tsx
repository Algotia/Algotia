import { BacktestResults, OHLCV } from "@algotia/core";
import { Component, ContextType, FC } from "react";
import { max as d3Max } from "d3-array";
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
    Annotate,
    LabelAnnotation,
    LabelAnnotationProps,
    defaultScaleProvider,
    OHLCTooltip,
    HoverTooltip,
    timeFormat,
} from "react-financial-charts";
import { BacktestContext } from "./context";

interface ChartProps extends WithSizeProps {
    readonly ratio: number;
}

class ResultChart extends Component<ChartProps> {
    static contextType = BacktestContext;

    context!: ContextType<typeof BacktestContext>;
    private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };

    private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d: OHLCV) => new Date(d.timestamp)
    );

    private readonly buyAnnotation: Omit<LabelAnnotationProps, "plotData"> = {
        rotate: 90,
        text: ({ timestamp }: OHLCV) => {
            if (this.context.results) {
                const order = this.context.results.closedOrders.find(
                    (order) => order.timestamp === timestamp
                );
                if (order) return order.side;
            }
            return "";
        },
        tooltip: "yeet",
        fill: ({ timestamp }: OHLCV) => {
            if (this.context.results) {
                const order = this.context.results.closedOrders.find(
                    (order) => order.timestamp === timestamp
                );
                if (order) return order.side === "buy" ? "green" : "red";
            }
            return "#000";
        },
        y: ({ yScale, datum }: any) => {
            const order = this.context.results?.closedOrders.find(
                (order) => order.timestamp == datum.timestamp
            );
            if (order?.side === "buy") {
                return yScale(datum.high) - 20;
            } else {
                return yScale(datum.low) + 20;
            }
        },
    };

    public render() {
        const { height, width } = this.props;

        const annotationDates = (data: OHLCV) => {
            return (
                Boolean(
                    this.context.results?.closedOrders.find(
                        (order) => order.timestamp === data.timestamp
                    )
                ) || false
            );
        };

        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = this.xScaleProvider(this.context.candles || []);

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
                    <XAxis showGridLines={true} />
                    <YAxis showGridLines={true} />
                    <Annotate
                        with={LabelAnnotation}
                        usingProps={this.buyAnnotation}
                        when={annotationDates}
                    />
                    <CandlestickSeries />
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

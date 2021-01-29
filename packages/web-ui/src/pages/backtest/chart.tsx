import { OHLCV_Candle } from "@algotia/core";
import { Component, ContextType, FC } from "react";
import {
    ema,
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
    OHLCTooltip,
    LineSeries,
} from "react-financial-charts";
import { BacktestContext } from "./context";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

interface ChartProps extends WithSizeProps {
    readonly ratio: number;
}

const Wrapper = styled(Paper)`
    && {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }
`;

class ResultChart extends Component<ChartProps> {
    static contextType = BacktestContext;

    context!: ContextType<typeof BacktestContext>;

    private readonly margin = { left: 0, right: 40, top: 0, bottom: 24 };

    private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d: OHLCV_Candle) => new Date(d.timestamp)
    );

    private readonly buyAnnotation: Omit<LabelAnnotationProps, "plotData"> = {
        rotate: 90,
        text: ({ timestamp }: OHLCV_Candle) => {
            if (this.context.requestResult) {
                const order = this.context.requestResult.results.closedOrders.find(
                    (order) => order.timestamp === timestamp
                );
                if (order) return order.side;
            }
            return "";
        },
        tooltip: "yeet",
        fill: ({ timestamp }: OHLCV_Candle) => {
            if (this.context.requestResult) {
                const order = this.context.requestResult.results.closedOrders.find(
                    (order) => order.timestamp === timestamp
                );
                if (order) return order.side === "buy" ? "green" : "red";
            }
            return "#000";
        },
        y: ({ yScale, datum }: any) => {
            const order = this.context.requestResult?.results.closedOrders.find(
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

        const annotationDates = (data: OHLCV_Candle) => {
            return Boolean(
                this.context.requestResult?.results.closedOrders.find(
                    (order) => order.timestamp === data.timestamp
                )
            );
        };

        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = this.xScaleProvider(this.context.requestResult?.candles || []);

        const max = xAccessor(data[data.length - 1]);
        const min = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [min, max];

        if (!data.length) {
            return (
                <Wrapper>
                    <div>no data</div>
                </Wrapper>
            );
        }
        return (
            <Wrapper>
                <ChartCanvas
                    height={height - 4}
                    width={width - 4}
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
                        {data.length && (
                            <OHLCTooltip
                                ohlcFormat={(n) => {
                                    const precision =
                                        this.context.requestResult?.market
                                            .precision.quote || 4;
                                    return n.valueOf().toFixed(precision);
                                }}
                                origin={[8, 16]}
                                textFill={(d) =>
                                    d.close > d.open ? "#26a69a" : "#ef5350"
                                }
                            />
                        )}
                    </Chart>
                </ChartCanvas>
            </Wrapper>
        );
    }

    private readonly yExtents = (data: OHLCV_Candle) => {
        return [data.high, data.low];
    };
}

export default withSize({ style: { width: "100%", height: "100%" } })(
    withDeviceRatio()(ResultChart)
);

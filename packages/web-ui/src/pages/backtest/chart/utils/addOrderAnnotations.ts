import { Order, StrategyError } from "@algotia/client";
import { Chart } from "klinecharts";

const addOrderAnnotations = (
    chart: Chart | null,
    closedOrders: Order[] | undefined,
    errors: StrategyError[] | undefined
) => {
    const getClosedOrders = (timestamp: number) => {
        return closedOrders?.filter((order) => {
            return order.timestamp === timestamp;
        });
    };
    const getErrors = (timestamp: number) => {
        return errors?.filter((error) => {
            return error.timestamp === timestamp;
        });
    };
    chart?.subscribeDrawAction(
        "drawCandle",
        ({ ctx, coordinate, isCandle, kLineData, halfBarSpace, barSpace }) => {
            if (isCandle) {
                const closedOrders = getClosedOrders(kLineData.timestamp);
                const errors = getErrors(kLineData.timestamp);
                if (closedOrders?.length) {
                    const fontSize = barSpace * 0.8;
                    const padding = halfBarSpace * 4;
                    let topPadding = padding;
                    let bottomPadding = padding;
                    closedOrders.forEach((order) => {
                        ctx.beginPath();
                        const yPos =
                            order.side === "buy"
                                ? coordinate.high - topPadding
                                : coordinate.low + bottomPadding;
                        ctx.arc(
                            coordinate.x,
                            yPos,
                            halfBarSpace,
                            0,
                            Math.PI * 2
                        );
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = order.side === "buy" ? "green" : "red";
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                        ctx.fillStyle = "white";
                        ctx.font = fontSize + "px Arial";
                        ctx.fillText(
                            order.side === "buy" ? "B" : "S",
                            coordinate.x - halfBarSpace / 2,
                            yPos + halfBarSpace / 2,
                            barSpace
                        );
                        if (order.side === "buy") {
                            topPadding += padding;
                        } else {
                            bottomPadding += padding;
                        }
                    });
                }
                if (errors?.length) {
                    const fontSize = barSpace * 0.8;
                    const padding = halfBarSpace * 4;
                    let topPadding = padding;
                    errors.forEach(() => {
                        ctx.beginPath();
                        const yPos = coordinate.high - topPadding;
                        ctx.arc(
                            coordinate.x,
                            yPos,
                            halfBarSpace,
                            0,
                            Math.PI * 2
                        );
                        ctx.strokeStyle = "black";
                        ctx.fillStyle = "red";
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                        ctx.fillStyle = "white";
                        ctx.font = fontSize + "px Arial";
                        ctx.fillText(
                            "E",
                            coordinate.x - halfBarSpace / 2,
                            yPos + halfBarSpace / 2,
                            barSpace
                        );
                        topPadding += padding;
                    });
                }
            }
        }
    );
};

export default addOrderAnnotations;

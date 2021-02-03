import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { GraphicMark, Chart } from "klinecharts";
//@ts-ignore
import { checkPointOnSegmentLine } from "klinecharts/lib/mark/graphicHelper";
import styled from "styled-components";
import {
    Channel,
    Fibbonaci,
    Parallel,
    PriceLine,
    HorizontalRay,
    HorizontalLine,
    HorizontalSegment,
    VerticalRay,
} from "./icons";
import { BaseIcon } from "./icons/BaseIcon";
import { Row } from "../../../components";
import { Button, makeStyles, Paper, Typography } from "@material-ui/core";

const Flex = styled(Paper)`
    && {
        position: absolute;
        left: 100%;
        z-index: 100;
        height: 90%;
		width: 500px;
        background-color: #fff;
        z-index: 100;
        display: flex;
        flex-flow: column wrap;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 5px 0;
    }
`;

const rect: GraphicMark = {
    name: "rect",
    totalStep: 3,
    checkMousePointOn: (type: any, points: any, mousePoint: any) => {
        return checkPointOnSegmentLine(points[0], points[1], mousePoint);
    },
    createGraphicDataSource: (step, tpPoint, xyPoints) => {
        if (xyPoints.length === 2) {
            return [
                {
                    type: "line",
                    isDraw: false,
                    isCheck: true,
                    dataSource: [
                        [
                            { ...xyPoints[0] },
                            { x: xyPoints[1].x, y: xyPoints[0].y },
                        ],
                        [
                            { x: xyPoints[1].x, y: xyPoints[0].y },
                            { ...xyPoints[1] },
                        ],
                        [
                            { ...xyPoints[1] },
                            { x: xyPoints[0].x, y: xyPoints[1].y },
                        ],
                        [
                            { x: xyPoints[0].x, y: xyPoints[1].y },
                            { ...xyPoints[0] },
                        ],
                    ],
                },
                {
                    type: "polygon",
                    isDraw: true,
                    isCheck: false,
                    style: "fill",
                    dataSource: [
                        { ...xyPoints[0] },
                        { x: xyPoints[1].x, y: xyPoints[0].y },
                        { ...xyPoints[1] },
                        { x: xyPoints[0].x, y: xyPoints[1].y },
                    ],
                },
                {
                    type: "polygon",
                    isDraw: true,
                    isCheck: false,
                    dataSource: [
                        { ...xyPoints[0] },
                        { x: xyPoints[1].x, y: xyPoints[0].y },
                        { ...xyPoints[1] },
                        { x: xyPoints[0].x, y: xyPoints[1].y },
                    ],
                },
            ];
        }
        return [];
    },
};

const circle: GraphicMark = {
    name: "circle",
    totalStep: 3,
    checkMousePointOn: (type: any, points: any, mousePoint: any) => {
        const xDis = Math.abs(points.x - mousePoint.x);
        const yDis = Math.abs(points.y - mousePoint.y);
        const r = Math.sqrt(xDis * xDis + yDis * yDis);
        return Math.abs(r - points.radius) < 3;
    },
    createGraphicDataSource: (step: any, tpPoint: any, xyPoints: any) => {
        if (xyPoints.length === 2) {
            const xDis = Math.abs(xyPoints[0].x - xyPoints[1].x);
            const yDis = Math.abs(xyPoints[0].y - xyPoints[1].y);
            const radius = Math.sqrt(xDis * xDis + yDis * yDis);
            return [
                {
                    type: "arc",
                    isDraw: true,
                    isCheck: false,
                    style: "fill",
                    dataSource: [
                        {
                            ...xyPoints[0],
                            radius,
                            startAngle: 0,
                            endAngle: Math.PI * 2,
                        },
                    ],
                },
                {
                    type: "arc",
                    isDraw: true,
                    isCheck: true,
                    dataSource: [
                        {
                            ...xyPoints[0],
                            radius,
                            startAngle: 0,
                            endAngle: Math.PI * 2,
                        },
                    ],
                },
            ];
        }
        return [];
    },
};

const drawLines = [
    {
        key: "horizontalStraightLine",
        text: "Horizontal Line",
        Icon: HorizontalLine,
    },
    {
        key: "horizontalSegment",
        text: "Horizontal Segment",
        Icon: HorizontalSegment,
    },
    { key: "horizontalRayLine", text: "Horizontal Ray", Icon: HorizontalRay },
    { key: "priceLine", text: "Price Line", Icon: PriceLine },
    { key: "priceChannelLine", text: "Price Channel", Icon: Channel },
    { key: "parallelStraightLine", text: "Parallel Lines", Icon: Parallel },
    { key: "verticalRayLine", text: "Vertical Ray", Icon: VerticalRay },
    { key: "fibonacciLine", text: "Fibonacci Retracement", Icon: Fibbonaci },
];

const useButtonStyles = makeStyles({
    root: {
		width: "250px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});

const DrawToolsMenu: FC<{
    chart: Chart | null;
    setShowPopper: Dispatch<SetStateAction<boolean>>;
}> = ({ chart, setShowPopper }) => {
    const [hoveredEl, setHoveredEl] = useState("");

    useEffect(() => {
        chart?.addCustomGraphicMark(rect);
        chart?.addCustomGraphicMark(circle);
    }, []);

    const buttonClasses = useButtonStyles();

    return (
        <Flex>
            {drawLines.map(({ key, text, Icon }) => {
                return (
                    <Button
                        fullWidth
                        classes={buttonClasses}
                        onClick={() => {
                            setShowPopper(false);
                            chart?.createGraphicMark(key);
                        }}
                    >
                        <BaseIcon key={key} text={text}>
                            <Icon />
                        </BaseIcon>
                        <Typography
                            variant="subtitle2"
                            noWrap
                            style={{ marginRight: "5px" }}
                        >
                            {text}
                        </Typography>
                    </Button>
                );
            })}
        </Flex>
    );
};

export default DrawToolsMenu;

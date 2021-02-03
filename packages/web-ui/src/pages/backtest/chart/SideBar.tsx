import { FC, useRef, useState } from "react";
import { Chart } from "klinecharts";
//@ts-ignore
import styled from "styled-components";
import { Button, makeStyles } from "@material-ui/core";
import DrawToolsMenu from "./DrawToolsMenu";

const Bar = styled.div`
    height: 100%;
    width: 45px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #444;
    position: relative;
`;

const useButtonStyles = makeStyles({
    root: {
        minWidth: "45px",
    },
});

const SideBar: FC<{ chart: Chart | null; disabled: boolean }> = ({
    chart,
    disabled,
}) => {
    const [showDrawingTools, setShowDrawingTools] = useState(false);
    const drawButtonRef = useRef<HTMLButtonElement>(null);
    const buttonClasses = useButtonStyles();

    return (
        <Bar>
            <Button
                disabled={disabled}
                fullWidth
                classes={buttonClasses}
                style={{ width: 45 }}
                ref={drawButtonRef}
                onClick={() => {
                    setShowDrawingTools(!showDrawingTools);
                }}
            >
                D
            </Button>
            {showDrawingTools && (
                <DrawToolsMenu
                    chart={chart}
                    setShowPopper={setShowDrawingTools}
                />
            )}
            <button
                onClick={() => {
                    chart?.removeAllGraphicMark();
                }}
            >
                T
            </button>
        </Bar>
    );
};

export default SideBar;

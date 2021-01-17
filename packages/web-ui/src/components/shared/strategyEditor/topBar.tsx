import { MenuItem, Select, Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { StrictMode } from "react"
import { FC, useState } from "react";
import styled from "styled-components";
import { Row } from "../utils";
import { StrategyMeta } from "./strategyEditor";

const BarWrapper = styled(Row)`
    height: 45px;
    width: 100%;
    background-color: #444;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    box-sizing: border-box;
`;

const NewButton = styled(Button)``;

//TODO: import StrategyData from server types

const useButtonStyles = makeStyles({
    root: {
        height: "35px",
        width: "45px",
        backgroundColor: "#72a56f",
        position: "absolute",
        right: "15px",
    },
});

const useSelectStyles = makeStyles({
    root: {
        maxHeight: "35px",
        height: "35px",
        minWidth: "100px",
    },
});

const TopBar: FC<{
    allStrategies: StrategyMeta[] | undefined;
    selectStrategy: (data: StrategyMeta) => void;
}> = (props) => {
    const { allStrategies, selectStrategy } = props;
const [selectVal, setSelectVal] = useState("");

    const buttonClasses = useButtonStyles();
    const selectClasses = useSelectStyles();

    return (
        <BarWrapper>
            <FormControl margin="dense">
                <Select
                    id="strategy-selector"
                    displayEmpty
                    classes={selectClasses}
                    style={{ height: "35px" }}
                    value={selectVal}
                    variant="filled"
                >
                    <MenuItem value="">Strategy</MenuItem>
                    {allStrategies &&
                        allStrategies.map((data) => {
                            return (
                                <MenuItem
                                    key={"select-file-" + data.basename}
                                    value={data.basename}
                                    onClick={() => {
                                        setSelectVal(data.basename);
                                        selectStrategy(data);
                                    }}
                                >
                                    {data.basename}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            <NewButton classes={buttonClasses}>Hello</NewButton>
        </BarWrapper>
    );
};

export default TopBar;

import { MenuItem, Select, Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "../utils";
import NewStrategyModal from "./newStrategyModal";
import { DefaultApi, StrategyMetaData } from "@algotia/client";

const BarWrapper = styled(Row)`
    height: 35px;
    width: 100%;
    background-color: #444;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
`;

//TODO: import StrategyData from server types

const TopBar: FC<{}> = () => {
    return <BarWrapper />;
};

export default TopBar;

import { StrategyFile } from "@algotia/client";
import { CircularProgress } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    background-color: #007acc;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px 0;
    font-size: 0.8em;
    box-sizing: border-box;
`;

const Language = styled.p`
    position: absolute;
    right: 15px;
`;

const Modified = styled.p`
    position: absolute;
    left: 15px;
`;

const BottomBar: FC<{
    height: string;
    meta: StrategyFile | undefined;
    modifiedAt: Date | undefined;
    saving: boolean;
}> = ({ height, meta, saving, modifiedAt }) => {
    return (
        <Wrapper style={{ height }}>
            <Modified>
                {saving ? (
                    <CircularProgress />
                ) : modifiedAt ? (
                    "Last saved: " + modifiedAt.toLocaleString()
                ) : (
                    "No strategy loaded"
                )}
            </Modified>
            <Language>{meta ? meta.language : "Text"}</Language>
        </Wrapper>
    );
};

export default BottomBar;

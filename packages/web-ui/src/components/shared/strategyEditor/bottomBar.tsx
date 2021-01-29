import { StrategyMetaData } from "@algotia/client";
import { FC } from "react";
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

const BottomBar: FC<{ height: string; meta: StrategyMetaData | undefined }> = ({
    height,
    meta,
}) => {
    const modifiedAtDate: Date = new Date(meta?.modifiedAt || 0);
    const modifiedToday: boolean =
        new Date().toDateString() === modifiedAtDate.toDateString();
    return (
        <Wrapper style={{ height }}>
            {meta && (
                <>
                    <Modified>
                        Modified at{" "}
                        {modifiedToday
                            ? modifiedAtDate.toLocaleTimeString()
                            : modifiedAtDate.toLocaleDateString() +
                              " " +
                              modifiedAtDate.toLocaleTimeString()}
                    </Modified>
                    <Language>{meta.language}</Language>
                </>
            )}
        </Wrapper>
    );
};

export default BottomBar;

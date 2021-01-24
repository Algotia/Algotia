import React, { FC, MutableRefObject, useRef, useState } from "react";
import styled from "styled-components";
import { StrategyEditor } from "../../components/shared";

const EditorRoot = styled.div`
    height: 100%;
    width: 100%;
`;

const Editor: FC<{ setStraegyPath: (path: string) => void }> = (props) => {
    const { setStraegyPath } = props;

    const rootRef = useRef<any>();

    return (
        <EditorRoot ref={rootRef}>
            <StrategyEditor
                rootRef={rootRef}
                onStrategySelected={(strategy) => {
                    setStraegyPath(strategy.path);
                }}
            />
        </EditorRoot>
    );
};

export default Editor;

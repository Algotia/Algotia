import React, { FC, useState } from "react";
import styled from "styled-components";
import { StrategyEditor } from "../../components/shared";

const Editor: FC<{ setStraegyPath: (path: string) => void }> = (props) => {
    const { setStraegyPath } = props;

    return (
        <StrategyEditor
			height="100%"
            onStrategySelected={(strategy) => {
                setStraegyPath(strategy.path);
            }}
        />
    );
};

export default Editor;

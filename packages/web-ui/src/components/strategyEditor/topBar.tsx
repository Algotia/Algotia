import {
    styled as muiStyled,
    Paper,
    ClickAwayListener,
    Button,
    makeStyles,
} from "@material-ui/core";
import { VscFiles, VscFolder, VscFolderOpened, VscJson } from "react-icons/vsc";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { GrDocumentText } from "react-icons/gr";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Row } from "../shared";
import { DefaultApi, FileStructure, StrategyFile } from "@algotia/client";
import { TreeItem, TreeView } from "@material-ui/lab";
import ActionPanel from "./actionPanel";

const BarWrapper = styled(Row)`
    height: 50px;
    width: 100%;
    background-color: #444;
    align-items: center;
    justify-content: flex-start;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
`;

const useButtonIconStyles = makeStyles({
    root: {
        height: "100%",
        width: "35px",
    },
});

const client = new DefaultApi();

const TopBar: FC<{
    panelOpen: boolean;
    strategyFile: StrategyFile | undefined;
    setStrategyFile: Dispatch<SetStateAction<StrategyFile | undefined>>;
    setEditorValue: Dispatch<SetStateAction<string>>;
    setPanelOpen: Dispatch<SetStateAction<boolean>>;
    strategyDir: FileStructure | undefined;
}> = ({
    panelOpen,
    setPanelOpen,
    strategyDir,
    strategyFile,
    setStrategyFile,
    setEditorValue,
}) => {
    const buttonIconStyles = useButtonIconStyles();

    return (
        <BarWrapper>
            <Button
                disabled={!strategyDir}
                onClick={() => strategyDir && setPanelOpen(!panelOpen)}
                classes={buttonIconStyles}
            >
                <VscFiles size={20} />
            </Button>
            {panelOpen && (
                <ActionPanel
                    strategyDir={strategyDir}
                    setPanelOpen={setPanelOpen}
                    setEditorValue={setEditorValue}
                    setStrategyFile={setStrategyFile}
                />
            )}
        </BarWrapper>
    );
};

export default TopBar;

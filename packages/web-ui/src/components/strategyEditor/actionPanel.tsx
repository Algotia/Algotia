import {
    styled as muiStyled,
    Paper,
    ClickAwayListener,
} from "@material-ui/core";
import { VscFolder, VscFolderOpened, VscJson } from "react-icons/vsc";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { GrDocumentText } from "react-icons/gr";
import { FC, useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import { DefaultApi, FileStructure, StrategyFile } from "@algotia/client";
import { TreeItem, TreeView } from "@material-ui/lab";

const Panel = muiStyled(Paper)(({ theme }) => ({
    margin: 0,
    position: "absolute",
    top: "calc(50% - 100px)",
    left: "25%",
    zIndex: 2000,
    width: "50%",
    minHeight: "200px",
    backgroundColor: "#444",
}));

const client = new DefaultApi();

const ActionPanel: FC<{
    strategyDir: FileStructure | undefined;
    setStrategyFile: Dispatch<SetStateAction<StrategyFile | undefined>>;
    setEditorValue: Dispatch<SetStateAction<string>>;
    setPanelOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ strategyDir, setStrategyFile, setEditorValue, setPanelOpen }) => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const handleToggle = (_: ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (_: ChangeEvent<{}>, nodeIds: string[]) => {
        console.log(nodeIds);
        setSelected(nodeIds);
    };

    const renderTree = (nodes: FileStructure) => {
        return (
            <TreeItem
                key={nodes.id}
                nodeId={nodes.fullPath}
                onClick={(e) => {
                    e.preventDefault();
                    if (nodes.children) {
                        return;
                    } else {
                        client
                            .readStrategyFile(nodes.fullPath)
                            .then(({ data }) => {
                                setStrategyFile(data);
                                setEditorValue(data.contents);
                                setPanelOpen(false);
                            });
                    }
                }}
                icon={
                    nodes.language === "TypeScript" ? (
                        <SiTypescript />
                    ) : nodes.language === "JavaScript" ? (
                        <SiJavascript />
                    ) : nodes.language === "JSON" ? (
                        <VscJson />
                    ) : nodes.language === "Text" ? (
                        <GrDocumentText />
                    ) : null
                }
                label={nodes.name}
            >
                {Array.isArray(nodes.children)
                    ? nodes?.children
                          .sort((node) => (node.children ? 0 : 1))
                          .map((node) => renderTree(node))
                    : null}
            </TreeItem>
        );
    };

    return (
        <ClickAwayListener onClickAway={() => setPanelOpen(false)}>
            <Panel>
                <TreeView
                    expanded={expanded}
                    selected={selected}
                    defaultExpandIcon={<VscFolder />}
                    defaultCollapseIcon={<VscFolderOpened />}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                >
                    {strategyDir && renderTree(strategyDir)}
                </TreeView>
            </Panel>
        </ClickAwayListener>
    );
};

export default ActionPanel;

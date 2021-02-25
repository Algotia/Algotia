import { FC, useEffect, useRef, useState } from "react";
import Editor, { EditorDidMount, monaco } from "@monaco-editor/react";
import styled from "styled-components";
import TopBar from "./topBar";
import defaultValue from "./defaultValue";
import editorTypes from "../../assets/editor_types";
import BottomBar from "./bottomBar";
import { Paper, useTheme } from "@material-ui/core";
import {
    StrategyFile,
    FileStructure,
    StrategyMetaData,
    DefaultApi,
} from "@algotia/client";

let KEY_S: number;
let CtrlCmd: number;

monaco.init().then((m) => {
    m.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: m.languages.typescript.ScriptTarget.ES2016,
        allowNonTsExtensions: true,
        moduleResolution: m.languages.typescript.ModuleResolutionKind.NodeJs,
        module: m.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
    });

    Object.keys(editorTypes).forEach((key) => {
        if (editorTypes.hasOwnProperty(key)) {
            m.languages.typescript.typescriptDefaults.addExtraLib(
                //@ts-ignore
                editorTypes[key],
                `node_modules/${key}`
            );
            m.languages.typescript.javascriptDefaults.addExtraLib(
                //@ts-ignore
                editorTypes[key],
                `node_modules/${key}`
            );
        }
    });

    CtrlCmd = m.KeyMod.CtrlCmd;
    KEY_S = m.KeyCode.KEY_S;
});

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`;
const InnerEditorWrapper = styled.div`
    flex: 1;
`;

const SideBarRow = styled.div`
    flex: 1;
    display: flex;
`;

const client = new DefaultApi();

const StrategyEditor: FC<{
    onStrategySaved: (args: { meta: StrategyFile; value: string }) => void;
    strategyMeta: StrategyMetaData | undefined;
}> = ({ onStrategySaved, strategyMeta }) => {
    const [editorValue, setEditorValue] = useState(defaultValue);
    const [strategyFile, setStrategyFile] = useState<StrategyFile>();
    const [strategyDir, setStrategyDir] = useState<FileStructure>();
    const [panelOpen, setPanelOpen] = useState(false);

    const [saving, setSaving] = useState(false);
    const [modifiedAt, setModifiedAt] = useState<Date>();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<any>();

    const editorDidMount: EditorDidMount = (_, editor) => {
        editorRef.current = editor;
    };

    editorRef.current?.addCommand(CtrlCmd | KEY_S, () => {
        if (editorRef.current && strategyFile) {
            setSaving(true);
            client
                .writeStrategyFile({
                    path: strategyFile.path,
                    contents: editorRef.current.getValue(),
                })
                .then(() => {
                    setModifiedAt(new Date());
                })
                .catch((err) => {
                    alert(err.toString());
                })
                .finally(() => {
                    setSaving(false);
                });
        } else {
            alert("no strategy");
        }
    });
    useEffect(() => {
        if (strategyMeta) {
            client.readStrategyDir(strategyMeta.path).then(({ data }) => {
                setStrategyDir(data);
            });

            client
                .readStrategyFile(strategyMeta.indexFile)
                .then(({ data }) => {
                    setStrategyFile({
                        ...data,
                    });
                    setEditorValue(data.contents);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }, [strategyMeta]);

    useEffect(() => {
        if (strategyFile) setModifiedAt(new Date(strategyFile.modifiedAt));
    }, [strategyFile]);

    const theme = useTheme();
    const vsTheme = "vs-" + theme.palette.type;

    return (
        <Container ref={rootRef}>
            <TopBar
                panelOpen={panelOpen}
                setPanelOpen={setPanelOpen}
                strategyDir={strategyDir}
                setStrategyFile={setStrategyFile}
                strategyFile={strategyFile}
                setEditorValue={setEditorValue}
            />
            <SideBarRow>
                <InnerEditorWrapper>
                    <Editor
                        language={
                            strategyFile
                                ? // strategyMeta.language is the formatted language name
                                  // TypeScript || JavaScript -> typescript | javascript
                                  strategyFile.language?.toLowerCase()
                                : "text"
                        }
                        options={{
                            readOnly: !strategyFile,
                        }}
                        theme={vsTheme}
                        value={editorValue || defaultValue}
                        editorDidMount={editorDidMount}
                    />
                </InnerEditorWrapper>
            </SideBarRow>
            <BottomBar
                height="20px"
                meta={strategyFile}
                modifiedAt={modifiedAt}
				saving={saving}
            />
        </Container>
    );
};

export default StrategyEditor;

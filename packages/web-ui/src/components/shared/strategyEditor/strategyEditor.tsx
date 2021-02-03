import { FC, useState, useEffect, useRef, MutableRefObject } from "react";
import Editor, { EditorDidMount, monaco } from "@monaco-editor/react";
import styled, { CSSObject, StyledComponent } from "styled-components";
import TopBar from "./topBar";
import defaultValue from "./defaultValue";
import editorTypes from "../../../assets/editor_types";
import BottomBar from "./bottomBar";
import { Paper, useTheme } from "@material-ui/core";
import { StrategyData } from "@algotia/types";
import { DefaultApi, StrategyMetaData } from "@algotia/client";

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

const EditorWrapper = styled(Paper)`
    && {
        height: 100%;
        width: 100%;
    }
`;

const EditorSSS = styled.div`
    height: calc(100% - 55px);
`;

const client = new DefaultApi();

const StrategyEditor: FC<{
    rootRef: MutableRefObject<HTMLDivElement> | undefined;
    onStrategySelected?: (strategy: StrategyMetaData) => void;
}> = (props) => {
    const { onStrategySelected, rootRef } = props;

    const [editorValue, setEditorValue] = useState<string>(defaultValue);
    const [strategyMeta, setStrategyMeta] = useState<StrategyMetaData>();

    const selectStrategy = (meta: StrategyMetaData) => {
        client.getStrategyByFilename(meta.basename).then((res) => {
            setStrategyMeta(meta);
            setEditorValue(res.data.value);
        });
    };

    const editorRef = useRef<any>();

    const editorDidMount: EditorDidMount = (_, editor) => {
        editorRef.current = editor;
    };

    useEffect(() => {
        if (strategyMeta && editorRef.current) {
            onStrategySelected && onStrategySelected(strategyMeta);
            editorRef.current.addCommand(CtrlCmd | KEY_S, () => {
                if (editorRef.current && strategyMeta) {
                    const newValue = editorRef.current.getValue();

                    setStrategyMeta(
                        (prev) =>
                            prev && {
                                ...prev,
                                value: newValue,
                            }
                    );

                    client
                        .writeStrategy(strategyMeta.basename, {
                            contents: newValue,
                        })
                        .then(() => {
                            alert("Saved");
                        })
                        .catch((err) => {
                            alert(err["message"]);
                        });
                }
            });
        }
    }, [strategyMeta]);

    const theme = useTheme();
    const vsTheme = "vs-" + theme.palette.type;

    return (
        <EditorWrapper ref={rootRef}>
            <TopBar selectStrategy={selectStrategy} />
            <EditorSSS>
                <Editor
                    language={
                        strategyMeta
                            ? // strategyMeta.language is the formatted language name
                              // TypeScript || JavaScript -> typescript | javascript
                              strategyMeta.language.toLowerCase()
                            : "text"
                    }
                    height="100%"
                    options={{
                        readOnly: !strategyMeta,
                    }}
                    theme={vsTheme}
                    value={editorValue}
                    editorDidMount={editorDidMount}
                />
            </EditorSSS>
            <BottomBar height="20px" meta={strategyMeta} />
        </EditorWrapper>
    );
};

export default StrategyEditor;

import { FC, useState, useEffect, useRef } from "react";
import Editor, { EditorDidMount, monaco } from "@monaco-editor/react";
import styled, { CSSObject } from "styled-components";
import TopBar from "./topBar";
import defaultValue from "./defaultValue";
import editorTypes from "../../../assets/editor_types";

export interface StrategyMeta {
    basename: string;
    language: string;
    path: string;
}

export interface StrategyData extends StrategyMeta {
    value: string;
}

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

const EditorWrapper = styled.div`
    ${(props: { height: CSSObject["height"]; width?: CSSObject["width"] }) => {
        return `
		height: calc(${props.height} - 45px);
width: ${props.width || "100%"};
	   `;
    }}
`;

const StrategyEditor: FC<{
    onStrategySelected?: (strategy: StrategyData) => void;
    height: string;
    width?: string;
}> = (props) => {
    const { onStrategySelected, height, width } = props;

    const [editorValue, setEditorValue] = useState<string>(defaultValue);

    const [currentStrategy, setCurrentStrategy] = useState<StrategyData>();

    const selectStrategy = (meta: StrategyMeta) => {
        fetch(`/api/strategy/${meta.basename}`)
            .then((res) => res.json())
            .then((data: StrategyData) => {
                setEditorValue(data.value);
                setCurrentStrategy(data);
            });
    };

    const editorRef = useRef<any>();

    const editorDidMount: EditorDidMount = (_, editor) => {
        editorRef.current = editor;
    };

    useEffect(() => {
        if (currentStrategy && editorRef.current) {
            onStrategySelected && onStrategySelected(currentStrategy);
            editorRef.current.addCommand(CtrlCmd | KEY_S, () => {
                if (editorRef.current && currentStrategy) {
                    const newValue = editorRef.current.getValue();

                    setCurrentStrategy(
                        (prev) =>
                            prev && {
                                ...prev,
                                value: newValue,
                            }
                    );

                    fetch("/api/strategy", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fileName: currentStrategy.basename,
                            value: newValue,
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((json) => {
                            if (json.results === true) {
                                alert("saved");
                            }
                        })
                        .catch((err) => {
                            alert("something went wrong");
                        });
                }
            });
        }
    }, [currentStrategy]);

    return (
        <EditorWrapper height={height} width={width}>
            <TopBar selectStrategy={selectStrategy} />
            <Editor
                language={currentStrategy ? currentStrategy.language : "text"}
                options={{
                    readOnly: !currentStrategy,
                }}
                theme="vs-dark"
                value={editorValue}
                editorDidMount={editorDidMount}
            />
        </EditorWrapper>
    );
};

export default StrategyEditor;

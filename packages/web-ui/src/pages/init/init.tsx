import styled from "styled-components";
import { Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Column } from "../../components/shared";
import MonacoEditor, { monaco, EditorDidMount } from "@monaco-editor/react";
import { FC, useEffect, useState } from "react";
import { InitRes } from "../../App";

const Wrapper = styled(Column)`
    width: 100%;
    height: 100%;
    background-color: blue;
    justify-content: center;
    align-items: center;
`;

const Body = styled(Column)`
    width: 50%;
    height: 80%;
    align-items: center;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 50px;
`;

const Heading = styled.h1`
    font-size: 5em;
`;

const SubHeading = styled.h3`
    font-size: 3em;
    margin-top: 25px;
`;

const useStyles = makeStyles({
    root: {
        marginTop: "25px",
        backgroundColor: "green",
        borderRadius: 3,
        border: 0,
        color: "#ffffff",
        height: "50px",
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        "&:hover": {
            backgroundColor: "green",
        },
        "&:disabled": {
            color: "#000",
            backgroundColor: "grey",
        },
    },
    disabled: {},
});

monaco.init().then((monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [
            {
                uri: "http://json-schema.org/draft-07/schema",
                fileMatch: ["*"],
                schema: {
                    type: "object",
                    properties: {
                        port: {
                            type: "integer",
                            minimum: "1",
                            maximum: "65535",
                        },
                        strategyDir: {
                            title: "Strategy directory",
                            type: "string",
                            example: "/foo/bar",
                            pattern: "^/([A-z0-9-_+]+/)*([A-z0-9])+/?$",
                            description:
                                "An absoulte path to a directory that will be created, this path should not yet exist.",
                        },
                    },
                    required: ["port", "strategyDir"],
                    additionalProperties: false,
                },
            },
        ],
    });
});

const Init: FC<{
    init: InitRes;
    onInit: (config: any) => void;
}> = ({ init, onInit }) => {
    // const editorDidMount: EditorDidMount = (editor) => {
    //     editor.focus();
    // };

    const [config, setConfig] = useState<string>(init.initialConfig || "");
    const [runDisabled, setRunDisabled] = useState(false);

    useEffect(() => {
        console.log("INIT", init);
        init.initialConfig && setConfig(init.initialConfig);
    }, [init]);

    useEffect(() => {
        let json: any = {};
        try {
            json = JSON.parse(config);
        } catch (err) {}
        if (!json.port || !json.strategyDir) {
            setRunDisabled(true);
        } else {
            setRunDisabled(false);
        }
    }, [config]);

    const classes = useStyles();

    return (
        <Wrapper>
            <Body>
                <Header>
                    <Heading>Welcome</Heading>
                    <SubHeading>{"Let's get started"}</SubHeading>
                </Header>
                <MonacoEditor
                    width="80%"
                    height="400px"
                    theme="vs-dark"
                    value={config}
                    language={"json"}
                />
                <Button
                    classes={classes}
                    disabled={runDisabled}
                    onClick={() => {
                        !runDisabled && onInit(config);
                    }}
                >
                    submit
                </Button>
            </Body>
        </Wrapper>
    );
};

export default Init;

import { Dispatch, FC, SetStateAction, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { DefaultApi, StrategyLanguages } from "@algotia/client";
import { Button, ButtonGroup, FormControl, TextField } from "@material-ui/core";
import { Row as BaseRow } from "./utils";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript } from "react-icons/si";
import styled from "styled-components";

const client = new DefaultApi();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: "absolute",
            top: "calc(50% - 200px)",
            left: "calc(50% - 200px)",
            height: "300px",
            width: "400px",
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: "flex",
            alignItems: "center",
        },
        submit: {
            backgroundColor: theme.palette.success.main,
        },
    })
);

const Row = styled(BaseRow)`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
`;

export const NewStrategyModal: FC<{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render

    const handleClose = () => {
        setOpen(false);
    };

    const [language, setLanguage] = useState(StrategyLanguages.TypeScript);
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (name && language) {
            client
                .createNewStrategy({
                    name,
                    language,
                })
                .catch((err) => {
                    alert(err);
                })
                .finally(() => {
                    setOpen(false);
                });
        }
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.paper}>
                    <FormControl fullWidth>
                        <Row>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                style={{ marginRight: "15px" }}
                            />
                            <ToggleButtonGroup value={language}>
                                <ToggleButton
                                    value={StrategyLanguages.JavaScript}
                                    onClick={() =>
                                        setLanguage(
                                            StrategyLanguages.JavaScript
                                        )
                                    }
                                >
                                    <IoLogoJavascript color="#f1d91c" />
                                </ToggleButton>
                                <ToggleButton
                                    value={StrategyLanguages.TypeScript}
                                    onClick={() =>
                                        setLanguage(
                                            StrategyLanguages.TypeScript
                                        )
                                    }
                                >
                                    <SiTypescript color="#0077c7" />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Row>
                        <Row>
                            <Button
                                disabled={!name}
                                className={classes.submit}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            >
                                Create
                            </Button>
                        </Row>
                    </FormControl>
                </div>
            </Modal>
        </div>
    );
};

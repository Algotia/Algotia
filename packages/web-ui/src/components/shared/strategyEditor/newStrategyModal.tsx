import {DefaultApi} from "@algotia/client";
import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBody = styled.div`
    width: 30%;
    height: 30%;
    background-color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 15px;
`;

const useCloseModalButtonStyles = makeStyles({
    root: {
        position: "absolute",
        top: "15px",
        right: "15px",
        margin: "0 auto",
        cursor: "pointer",
    },
});

const useSubmitButtonStyles = makeStyles({
    root: {
        position: "absolute",
        bottom: "15px",
        backgroundColor: "green",
    },
});

const NewStrategyModal: FC<{
    modalOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    onNewStrategy: (fileName: string) => void;
}> = ({ modalOpen, setModalOpen, onNewStrategy }) => {
    const [fileName, setFileName] = useState("");
    const [strategyDir, setStrategyDir] = useState<string>();

    const closeModalClasses = useCloseModalButtonStyles();
    const submitButtonClasses = useSubmitButtonStyles();

	const client = new DefaultApi()

    useEffect(() => {

    }, []);

    const onSubmit = () => {

    };

    return (
        <Modal open={modalOpen}>
            <ModalContainer>
                {strategyDir ? (
                    <ModalBody>
                        <Close
                            className={closeModalClasses.root}
                            onClick={() => {
                                setModalOpen(false);
                            }}
                        />
                        <TextField
                            id={"new-strategy-text-field"}
                            label={"Path"}
                            value={fileName}
                            onChange={(e) => {
                                let val: string = e.target.value;
                                if (val.includes(strategyDir)) {
                                    setFileName(val);
                                }
                            }}
                        />
                        <Button
                            classes={submitButtonClasses}
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </ModalBody>
                ) : (
                    <div />
                )}
            </ModalContainer>
        </Modal>
    );
};

export default NewStrategyModal;

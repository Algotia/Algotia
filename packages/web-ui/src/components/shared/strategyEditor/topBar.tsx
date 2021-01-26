import { MenuItem, Select, Button, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "../utils";
import NewStrategyModal from "./newStrategyModal";
import { StrategyMetaData } from "@algotia/types";

const BarWrapper = styled(Row)`
    height: 35px;
    width: 100%;
    background-color: #444;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 5px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
`;

//TODO: import StrategyData from server types

const useButtonStyles = makeStyles({
    root: {
        height: "25px",
        width: "45px",
        backgroundColor: "#72a56f",
        position: "absolute",
        right: "15px",
    },
});

const TopBar: FC<{
    selectStrategy: (data: StrategyMetaData) => void;
}> = ({ selectStrategy }) => {
    const [allStrategies, setAllStrategies] = useState<StrategyMetaData[]>();
    const [selectVal, setSelectVal] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const buttonClasses = useButtonStyles();

    useEffect(() => {
        fetch("/api/strategy")
            .then((res) => res.json())
            .then((json) => {
                if (json.strategies) {
                    setAllStrategies(json.strategies);
                }
            });
    }, []);

    const onNewStrategyClick = () => {
        setModalOpen(true);
    };

    const onNewStrategy = (fileName: string) => {
        fetch("/api/strategy", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName,
                value: "",
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                if (json && !json.errors) {
                    fetch("/api/strategy")
                        .then((res) => res.json())
                        .then((json) => {
                            if (json.strategies) {
                                setAllStrategies(json.strategies);
                                setModalOpen(false);
                            }
                        })
                        .catch((err) => {
                            alert(err.message);
                        });
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <BarWrapper>
            <NewStrategyModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onNewStrategy={onNewStrategy}
            />
            <FormControl margin="dense">
                <Select id="strategy-selector" displayEmpty value={selectVal}>
                    <MenuItem value="">Strategy</MenuItem>
                    {allStrategies &&
                        allStrategies.map((data) => {
                            return (
                                <MenuItem
                                    key={"select-file-" + data.basename}
                                    value={data.basename}
                                    onClick={() => {
                                        setSelectVal(data.basename);
                                        selectStrategy(data);
                                    }}
                                >
                                    {data.basename}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            <Button classes={buttonClasses} onClick={onNewStrategyClick}>
                New
            </Button>
        </BarWrapper>
    );
};

export default TopBar;

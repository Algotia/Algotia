import { DefaultApi, StrategyMetaData } from "@algotia/client";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled as muiStyled,
} from "@material-ui/core";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { NewStrategyModal } from "../../../components";

const client = new DefaultApi();

const NewMenuItem = muiStyled(Button)({
    backgroundColor: "green",
});

const SelectStrategy: FC<{
    setStrategyMeta: Dispatch<SetStateAction<StrategyMetaData | undefined>>;
}> = ({ setStrategyMeta }) => {
    const [allStrategies, setAllStrategies] = useState<StrategyMetaData[]>();
    const [selectVal, setSelectVal] = useState<string>();
    const [newStrategyModalOpen, setNewStrategyModalOpen] = useState(false);

    useEffect(() => {
        client.getAllStrategies().then((res) => {
            setAllStrategies(res.data);
        });
        fetch("/api/strategy")
            .then((res) => res.json())
            .then((json) => {
                if (json.strategies) {
                    setAllStrategies(json.strategies);
                }
            });
    }, []);

    return (
        <>
            <FormControl fullWidth={true} variant="filled">
                <InputLabel>Strategy</InputLabel>
                <Select
                    id="strategy-selector"
                    displayEmpty
                    value={selectVal || ""}
                    label="Strategy"
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                        },
                    }}
                >
                    {allStrategies && allStrategies.length ? (
                        allStrategies.map((data, i) => {
                            return (
                                <MenuItem
                                    id={`select-strategy-${i}`}
                                    key={"select-strategy-" + data.name}
                                    value={data.name}
                                    onClick={() => {
                                        setSelectVal(data.name);
                                        setStrategyMeta(data);
                                    }}
                                >
                                    {data.name}
                                </MenuItem>
                            );
                        })
                    ) : (
                        <MenuItem id="no-strategies" value=" " disabled>
                            No Strategies
                        </MenuItem>
                    )}
                    <MenuItem>
                        <NewMenuItem
                            fullWidth
                            onClick={() => {
                                setNewStrategyModalOpen(true);
                            }}
                        >
                            New Strategy{" "}
                            <AiOutlinePlusCircle
                                style={{ marginLeft: "5px" }}
                            />
                        </NewMenuItem>
                    </MenuItem>
                </Select>
            </FormControl>
            <NewStrategyModal
                open={newStrategyModalOpen}
                setOpen={setNewStrategyModalOpen}
                onSubmit={() => {
                    client.getAllStrategies().then(({ data }) => {
                        setAllStrategies(data);
                    });
                }}
            />
        </>
    );
};

export default SelectStrategy;

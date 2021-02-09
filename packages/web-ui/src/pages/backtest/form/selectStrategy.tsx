import { DefaultApi, ExchangeID, StrategyMetaData } from "@algotia/client";
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from "@material-ui/core";
import {
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { BacktestContext } from "../context";

const useButtonStyles = makeStyles({
    root: {
        height: "25px",
        width: "45px",
        backgroundColor: "#72a56f",
        position: "absolute",
        right: "15px",
    },
});

const client = new DefaultApi();

const SelectStrategy: FC<{
    setStrategyPath: Dispatch<SetStateAction<string | undefined>>;
}> = ({ setStrategyPath }) => {
    const [allStrategies, setAllStrategies] = useState<StrategyMetaData[]>();
    const [selectVal, setSelectVal] = useState<string>();

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

    const onNewStrategyClick = () => {
        // setModalOpen(true);
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
                                // setModalOpen(false);
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
        <FormControl fullWidth={true} variant="filled">
            <InputLabel>Strategy</InputLabel>
            <Select
                id="strategy-selector"
                displayEmpty
                value={selectVal}
                label="Strategy"
            >
                {allStrategies &&
                    allStrategies.map((data, i) => {
                        return (
                            <MenuItem
                                id={`select-strategy-${i}`}
                                key={"select-strategy-" + data.basename}
                                value={data.basename}
                                onClick={() => {
                                    setSelectVal(data.basename);
                                    setStrategyPath(data.basename);
                                }}
                            >
                                {data.basename}
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
};

export default SelectStrategy;

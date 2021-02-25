import { DefaultApi, StrategyMetaData } from "@algotia/client";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import {
    Dispatch,
    FC,
    SetStateAction,
	useEffect,
    useState,
} from "react";

const client = new DefaultApi();

const SelectStrategy: FC<{
    setStrategyMeta: Dispatch<SetStateAction<StrategyMetaData | undefined>>;
}> = ({ setStrategyMeta }) => {
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

    return (
        <FormControl fullWidth={true} variant="filled">
            <InputLabel>Strategy</InputLabel>
            <Select
                id="strategy-selector"
                displayEmpty
                value={selectVal || ""}
                label="Strategy"
            >
                {allStrategies &&
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
                    })}
            </Select>
        </FormControl>
    );
};

export default SelectStrategy;

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { BacktestContext } from "../context";
import { ExchangeID } from "@algotia/client";

interface SelectExchangeProps {
    exchangeId: string;
    setExchangeId: Dispatch<SetStateAction<ExchangeID>>;
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}
const keys = enumKeys(ExchangeID);

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
}) => {
    const { strategyPath } = useContext(BacktestContext);
    return (
        <FormControl fullWidth={true}>
            <InputLabel htmlFor="exchange-select">
                Select an exchange
            </InputLabel>
            <Select
                value={exchangeId}
                id="exchange-select"
                disabled={!strategyPath}
            >
                {keys.map((key) => {
                    const id = ExchangeID[key];
                    return (
                        <MenuItem
                            key={"select-" + id}
                            value={id}
                            onClick={() => {
                                setExchangeId(id);
                            }}
                        >
                            {key}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectExchange;

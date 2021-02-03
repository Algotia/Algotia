import { ExchangeID } from "@algotia/client";
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from "@material-ui/core";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { BacktestContext } from "../context";

interface SelectExchangeProps {
    exchangeId: string;
    setExchangeId: Dispatch<SetStateAction<ExchangeID>>;
}

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
}) => {
    const { strategyPath } = useContext(BacktestContext);

    return (
        <FormControl fullWidth={true} focused={!!strategyPath && !exchangeId}>
            <InputLabel id="select-exchange-label">Exchange</InputLabel>
            <Select
                disabled={!strategyPath}
                labelId="select-exchange-label"
                id="select-exchange"
                value={exchangeId}
                label="Exchange"
            >
                {Object.entries(ExchangeID).map(([key, id]) => {
                    return (
                        <MenuItem
                            id={`exchange-select-${id}`}
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

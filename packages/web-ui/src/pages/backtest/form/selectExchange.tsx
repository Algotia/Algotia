import { AllowedExchangeIDs, ExchangeID } from "@algotia/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import {BacktestContext} from "../context";

interface SelectExchangeProps {
    exchangeId: string;
    setExchangeId: Dispatch<SetStateAction<ExchangeID>>;
}

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
}) => {
	const { strategyPath } = useContext(BacktestContext)
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
                {AllowedExchangeIDs.map((id) => {
                    return (
                        <MenuItem
                            key={"select-" + id}
                            value={id}
                            onClick={() => {
                                setExchangeId(id);
                            }}
                        >
                            {id}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default SelectExchange;

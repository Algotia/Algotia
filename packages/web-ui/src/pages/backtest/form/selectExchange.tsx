import { ExchangeID } from "@algotia/client";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectExchangeProps {
    exchangeId: string;
    setExchangeId: Dispatch<SetStateAction<ExchangeID>>;
    strategyPath: string | undefined;
}

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
    strategyPath,
}) => {
    return (
        <FormControl
            fullWidth={true}
            focused={!!strategyPath && !exchangeId}
            variant="filled"
        >
            <InputLabel id="select-exchange-label">Exchange</InputLabel>
            <Select
                open={!!strategyPath && !exchangeId}
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

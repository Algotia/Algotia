import { AllowedExchangeIDs, ExchangeID } from "@algotia/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectExchangeProps {
    exchangeId: string;
    setExchangeId: Dispatch<SetStateAction<ExchangeID>>;
    strategy: string | undefined;
}

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
    strategy,
}) => {
    return (
        <FormControl>
            <InputLabel htmlFor="exchange-select">
                Select an exchange
            </InputLabel>
            <Select
                value={exchangeId}
                id="exchange-select"
                style={{ width: "250px" }}
                disabled={!strategy}
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

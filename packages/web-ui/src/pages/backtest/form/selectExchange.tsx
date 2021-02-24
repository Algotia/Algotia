import { ExchangeIDs, StrategyMetaData } from "@algotia/client";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectExchangeProps {
    exchangeId: string | undefined;
    setExchangeId: Dispatch<SetStateAction<ExchangeIDs>>;
    strategyMeta: StrategyMetaData | undefined;
}

const SelectExchange: FC<SelectExchangeProps> = ({
    exchangeId,
    setExchangeId,
    strategyMeta,
}) => {
    return (
        <FormControl fullWidth={true} variant="filled">
            <InputLabel id="select-exchange-label">Exchange</InputLabel>
            <Select
                error={!!strategyMeta && !exchangeId}
                disabled={!strategyMeta}
                labelId="select-exchange-label"
                id="select-exchange"
                value={exchangeId}
                label="Exchange"
            >
                {Object.values(ExchangeIDs).map((id) => {
                    return (
                        <MenuItem
                            id={`exchange-select-${id}`}
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

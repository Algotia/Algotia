import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FC, useEffect, useState } from "react";

interface SelectInitialBalanceProps {
    id: string;
    currencyList: string[] | undefined;
    initialCurrency: string;
    onChange: (value: { currency: string; amount: number }) => void;
}

const SelectInitialBalance: FC<SelectInitialBalanceProps> = (props) => {
    const { id, initialCurrency, currencyList, onChange } = props;
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        onChange({ amount, currency: currency || initialCurrency });
    }, [amount, currency]);

    return (
        <>
            <Autocomplete
                id={id + "-autocomplete"}
                disabled={!initialCurrency}
                options={currencyList || []}
                getOptionLabel={(c) => c}
                style={{ width: "45%" }}
                value={initialCurrency || currency}
                inputValue={initialCurrency || currency}
                onChange={(_, val) => {
                    console.log("V", val);
                    if (val) {
                        setCurrency(val);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select a currency"
                        variant="standard"
                    />
                )}
            />
            <TextField
                id={id + "-text-field"}
                disabled={!initialCurrency}
                style={{ width: "45%" }}
                label={"Amount"}
                value={amount}
                error={typeof amount === "string"}
                onChange={(e) => {
                    let val: string | number = e.target.value;
                    if (!isNaN(Number(val))) {
                        error && setError(false);
                        val = Number(val);
                        setAmount(val);
                    } else {
                        setError(true);
                    }
                }}
            ></TextField>
        </>
    );
};

export default SelectInitialBalance;

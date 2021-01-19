import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { FC, useEffect, useState } from "react";

interface SelectInitialBalanceProps {
    id: string;
    currencyList: string[] | undefined;
    initialCurrency: string;
    onChange: (value: { currency: string; amount: number }) => void;
    FormItem: FC;
}

const SelectInitialBalance: FC<SelectInitialBalanceProps> = (props) => {
    const { id, initialCurrency, currencyList, onChange, FormItem } = props;
    const [currency, setCurrency] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        onChange({ amount, currency: currency || initialCurrency });
    }, [amount, currency]);

    return (
        <>
            <FormItem>
                <Autocomplete
                    id={id + "-autocomplete"}
                    fullWidth={true}
                    disabled={!initialCurrency}
                    options={currencyList || []}
                    getOptionLabel={(c) => c}
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
            </FormItem>
            <FormItem>
                <TextField
                    id={id + "-text-field"}
                    disabled={!initialCurrency}
                    fullWidth={true}
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
                />
            </FormItem>
        </>
    );
};

export default SelectInitialBalance;

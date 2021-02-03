import { Dispatch, FC, SetStateAction } from "react";
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnUtils from "@date-io/date-fns";
import { FormControl, makeStyles, TextField } from "@material-ui/core";

interface SelectDatesProps {
    exchangeId: string | undefined;
    setDate: Dispatch<SetStateAction<Date>>;
    date: Date;
    minDate: Date | undefined;
    label: string;
}

const SelectDate: FC<SelectDatesProps> = (props) => {
    const { setDate, date, label, minDate, exchangeId } = props;

    return (
        <FormControl variant="outlined">
            <MuiPickersUtilsProvider utils={DateFnUtils}>
                <KeyboardDateTimePicker
                    label={label}
                    disableFuture={true}
                    disabled={!exchangeId}
                    value={!exchangeId ? null : date}
                    TextFieldComponent={(props) => (
                        <TextField {...props} variant="outlined" />
                    )}
                    onChange={(d) => d && setDate(d)}
                    minDate={minDate}
                />
            </MuiPickersUtilsProvider>
        </FormControl>
    );
};

export default SelectDate;

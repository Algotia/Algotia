import { Dispatch, FC, SetStateAction } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnUtils from "@date-io/date-fns";

interface SelectDatesProps {
    isTimeError: boolean;
    exchangeId: string | undefined;
    setDate: Dispatch<SetStateAction<Date>>;
    date: Date;
    minDate: Date | undefined;
    label: string;
}

const SelectDate: FC<SelectDatesProps> = (props) => {
    const {
        isTimeError,
        setDate,
        date,
        label,
        minDate,
        exchangeId,
    } = props;

    return (
            <MuiPickersUtilsProvider utils={DateFnUtils}>
                <DateTimePicker
                    error={isTimeError}
                    label={label}
                    disabled={!exchangeId}
                    value={date}
                    onChange={(d) => d && setDate(d)}
                    minDate={minDate}
                />
            </MuiPickersUtilsProvider>
    );
};

export default SelectDate;

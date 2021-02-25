import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectPeriodProps {
    periodList: string[] | undefined;
    period: string;
    setPeriod: Dispatch<SetStateAction<string>>;
    pair: string;
}

const SelectPeriod: FC<SelectPeriodProps> = (props) => {
    const { periodList, period, pair, setPeriod } = props;
    return (
        <FormControl
            fullWidth={true}
            variant="filled"
            focused={!!pair && !period}
        >
            <InputLabel id="select-period-label">Period</InputLabel>
            <Select
                error={!!pair && !period}
                disabled={!periodList}
                labelId="select-period-label"
                id="select-exchange"
                value={period}
                label="Period"
            >
                {periodList &&
                    periodList.map((period) => {
                        return (
                            <MenuItem
                                key={"select-" + period}
                                value={period}
                                onClick={() => {
                                    setPeriod(period);
                                }}
                            >
                                {period}
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
};

export default SelectPeriod;

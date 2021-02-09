import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction, useContext } from "react";

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
			focused={!!periodList && !!pair && !period}
        >
            <InputLabel id="select-period-label">Period</InputLabel>
            <Select
                disabled={!periodList}
                labelId="select-period-label"
                id="select-exchange"
                value={period}
                label="Period"
				open={!!periodList && !!pair && !period}
            >
                {periodList &&
                    periodList.map((tf) => {
                        return (
                            <MenuItem
                                key={"select-" + tf}
                                value={tf}
                                onClick={() => {
                                    setPeriod(tf);
                                }}
                            >
                                {tf}
                            </MenuItem>
                        );
                    })}
            </Select>
        </FormControl>
    );
};

export default SelectPeriod;

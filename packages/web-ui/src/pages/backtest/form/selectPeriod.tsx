import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectPeriodProps {
    periodList: string[] | undefined;
    period: string;
    setPeriod: Dispatch<SetStateAction<string>>;
}

const SelectPeriod: FC<SelectPeriodProps> = (props) => {
    const { periodList, period, setPeriod } = props;
    return (
        <FormControl fullWidth={true}>
            <InputLabel
				variant="outlined"
                htmlFor="period-select"
                disabled={!periodList}
                id="period-select-label"
            >
                Period
            </InputLabel>
            <Select
                variant="outlined"
                disabled={!periodList}
                value={period}
                id="period-select"
            >
                {
                    //@ts-ignore
                    periodList &&
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
                        })
                }
            </Select>
        </FormControl>
    );
};

export default SelectPeriod;

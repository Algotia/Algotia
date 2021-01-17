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
        <FormControl style={{ width: "45%" }}>
            <InputLabel htmlFor="period-select" disabled={!periodList}>
                Select a period
            </InputLabel>
            <Select disabled={!periodList} value={period} id="period-select">
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

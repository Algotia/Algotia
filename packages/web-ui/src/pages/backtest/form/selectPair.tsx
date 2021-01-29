import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectPairProps {
    pairList: string[] | undefined;
    setPair: Dispatch<SetStateAction<string>>;
    pair: string;
}

const SelectPair: FC<SelectPairProps> = (props) => {
    const { pairList, setPair, pair } = props;
    return (
        <Autocomplete
            fullWidth={true}
            disabled={!pairList}
            options={pairList || []}
            getOptionLabel={(symbol) => symbol}
            value={pair}
            onChange={(_, val) => {
                if (val) {
                    setPair(val.toUpperCase());
                }
            }}
            renderInput={(params) => (
                <TextField {...params} label="Pair" variant="outlined" />
            )}
        />
    );
};

export default SelectPair;

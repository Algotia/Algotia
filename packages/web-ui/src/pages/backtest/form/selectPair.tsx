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
            id="select-pair"
            fullWidth={true}
            disabled={!pairList}
            options={pairList || []}
            value={pair}
            onChange={(_, val) => {
                setPair(val?.toUpperCase() || "");
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select a pair"
                    variant="standard"
                />
            )}
        />
    );
};

export default SelectPair;

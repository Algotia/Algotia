import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Dispatch, FC, SetStateAction } from "react";

interface SelectPairProps {
    pairList: string[] | undefined;
    setPair: Dispatch<SetStateAction<string>>;
}

const SelectPair: FC<SelectPairProps> = (props) => {
    const { pairList, setPair } = props;
    return (
        <Autocomplete
            disabled={!pairList}
            options={pairList || []}
            getOptionLabel={(symbol) => symbol}
            style={{ width: "45%" }}
            onInputChange={(_, val) => {
                if (val) {
                    setPair(val.toUpperCase());
                }
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

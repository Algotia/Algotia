import { FC } from "react";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

export const TextField: FC<TextFieldProps & { width?: string }> = ({
    width,
    children,
    ...rest
}) => {
    return (
        <div style={width ? { width } : {}}>
            <MuiTextField fullWidth {...rest}>
                {children}
            </MuiTextField>
        </div>
    );
};

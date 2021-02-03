import { createMuiTheme, ThemeOptions } from "@material-ui/core";

const createTheme = (theme: ThemeOptions) => {
    return createMuiTheme({
        ...theme,
        typography: {
            fontFamily: "Open Sans",
        },
        overrides: {
            MuiCssBaseline: {
                "@global": {
                    html: {
                        height: "100%",
                    },
                    body: {
                        height: "100%",
                    },
                    p: {
                        margin: "0",
                    },
                },
            },
            MuiInputBase: {
                disabled: {
                    borderColor: "red",
                },
            },
            MuiSelect: {
                outlined: {
                    borderColor: "red",
                },
                disabled: {
                    borderColor: "red",
                },
            },
        },
    });
};

export default createTheme;

import { createMuiTheme, ThemeOptions } from "@material-ui/core";

const createTheme = (theme: ThemeOptions) => {
    return createMuiTheme({
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
        },
        ...theme,
    });
};

export default createTheme;

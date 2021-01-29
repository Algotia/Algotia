import { createMuiTheme } from "@material-ui/core/styles";

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#142467",
        },
    },
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
				borderColor: "red"
			}
		},
		MuiSelect: {
			outlined: {
				borderColor: "red"
			},
			disabled: {
				borderColor: "red"
			}
		},
    },
});

export default muiTheme;

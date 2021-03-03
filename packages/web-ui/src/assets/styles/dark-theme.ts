import createTheme from "./base-theme";

const muiTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#2A3C48",
            light: "#A8D3ED",
            dark: "#093957",
        },
        background: {
            default: "#080C0E",
            paper: "#1e1e1e",
        },
        success: {
            main: "#60A660",
        },
    },
});

export default muiTheme;

import createTheme from "./base-theme";

const muiTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#33658A",
			light: "#A8D3ED",
			dark: "#093957"
        },
        background: {
            default: "#1C2931",
            paper: "#2F4858",
        },
		success: {
			main: "#60A660"
		}
    },
});

export default muiTheme;

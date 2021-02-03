import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, lightTheme } from "./assets/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { BacktestPage } from "./pages";
import Docs from "./pages/docs";
import { CssBaseline } from "@material-ui/core";

const Home = () => <div>home</div>;

export const ThemeSetterContext = createContext<{
    setTheme: () => void;
}>({ setTheme: () => {} });

function App() {
    const [theme, setTheme] = useState(lightTheme);
    const themeSetterContext = useContext(ThemeSetterContext);
    themeSetterContext.setTheme = () => {
        const newTheme =
            theme.palette.type === "light" ? darkTheme : lightTheme;
        console.log(newTheme.palette.type);
        setTheme(newTheme);
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/backtest">
                            <BacktestPage />
                        </Route>
                        <Route path="/docs">
                            <Docs />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </ThemeProvider>
    );
}

export default App;

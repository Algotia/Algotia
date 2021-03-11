import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { AllThemes, themes } from "./assets/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { Backtest, Docs } from "./pages";
import { CircularProgress, CssBaseline, Typography } from "@material-ui/core";
import { getCachedTheme } from "./utils";
import styled from "styled-components";

const Home = () => <div>home</div>;

export const ThemeSetterContext = createContext<{
    theme: keyof AllThemes;
    setTheme: (name: keyof AllThemes) => void;
}>({ setTheme: () => {}, theme: "Dark" });

const LoadingWrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function App() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState(themes["Dark"]);
    const [themeKey, setThemeKey] = useState<keyof AllThemes>("Dark");

    useEffect(() => {
        getCachedTheme()
            .then((key) => {
                if (key) {
                    setTheme(themes[key]);
                    setThemeKey(key);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const themeSetter = (name: keyof AllThemes) => {
        setTheme(themes[name]);
        setThemeKey(name);
    };
    return (
        <ThemeSetterContext.Provider
            value={{ setTheme: themeSetter, theme: themeKey }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {loading ? (
                    <LoadingWrapper>
                        <Typography style={{ color: "#000" }} component="h3">
                            Loading
                        </Typography>
                        <CircularProgress />
                    </LoadingWrapper>
                ) : (
                    <Router>
                        <Layout>
                            <Switch>
                                <Route path="/backtest">
                                    <Backtest />
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
                )}
            </ThemeProvider>
        </ThemeSetterContext.Provider>
    );
}

export default App;

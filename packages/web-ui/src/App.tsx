import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, ResetCSS } from "./assets/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { BacktestPage } from "./pages";
import Init from "./pages/init/init";

const About = () => <div>about</div>;
const Users = () => <div>users</div>;
const Home = () => <div>home</div>;

interface InitRes {
    init: boolean;
    initalConfig?: string;
}

function App() {
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState<InitRes>();

    useEffect(() => {
        fetch("/api/init")
            .then((res) => {
                return res.json();
            })
            .then((body) => {
                setLoading(false);
                setInit(body);
            });
    }, []);

    const onInit = (configJson: any) => {
        fetch("/api/init", {
            method: "POST",
            body: configJson,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.errors) {
                } else {
                    setInit(json);
                }
            })
            .catch((err) => {
                alert(`Something went wrong: ${err.message}`);
            });
    };

    return (
        <>
            {loading && <div />}
            <ThemeProvider theme={theme}>
                <ResetCSS />
                {init && init.init && (
                    <Router>
                        <Layout>
                            <Switch>
                                <Route path="/backtest">
                                    <BacktestPage />
                                </Route>
                                <Route path="/users">
                                    <Users />
                                </Route>
                                <Route path="/">
                                    <Home />
                                </Route>
                            </Switch>
                        </Layout>
                    </Router>
                )}
                {init && !init.init && init.initalConfig && (
                    <Init onInit={onInit} initalConfig={init.initalConfig} />
                )}
            </ThemeProvider>
        </>
    );
}

export default App;

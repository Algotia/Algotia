import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, ResetCSS } from "./assets/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { BacktestPage } from "./pages";
import Init from "./pages/init/init";
import Docs from "./pages/docs";

const About = () => <div>about</div>;
const Users = () => <div>users</div>;
const Home = () => <div>home</div>;

export interface InitRes {
    init: boolean;
    initialConfig?: string;
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
                setInit(body);
            })
            .finally(() => {
                setLoading(false);
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
                    alert(json.errors);
                } else {
                    setInit(json);
                }
            })
            .catch((err) => {
                alert(`Something went wrong: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
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
            {init && !init.init && <Init onInit={onInit} init={init} />}
        </ThemeProvider>
    );
}

export default App;

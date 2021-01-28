import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme, ResetCSS } from "./assets/styles/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { BacktestPage } from "./pages";
import Docs from "./pages/docs";

const About = () => <div>about</div>;
const Users = () => <div>users</div>;
const Home = () => <div>home</div>;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ResetCSS />
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
        </ThemeProvider>
    );
}

export default App;

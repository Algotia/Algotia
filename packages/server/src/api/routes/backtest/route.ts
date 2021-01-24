import { Router } from "express";
import { validateImperatively } from "../../../utils";
import { postBacktest, validatePostBacktest } from "./post";

export const backtestRoute = (router: Router) => {
    router
        .route("/backtest")
        .post(validateImperatively(validatePostBacktest), postBacktest);
};

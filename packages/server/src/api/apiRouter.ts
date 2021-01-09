import { Router } from "express";
import { Configurer, validateImperatively } from "../utils";
import {
    getInit,
    getStatus,
    getExchange,
    postInit,
    postBacktest,
    validateGetInit,
    validateGetStatus,
    validateGetExchange,
    validatePostBacktest,
    validatePostInit,
} from "./routes";

const createApiRouter = (configurer: Configurer): Router => {
    const router = Router();

    router
        .route("/init")
        .get(...validateGetInit, getInit(configurer))
        .post(...validatePostInit, postInit(configurer));

    router.route("/status").get(...validateGetStatus, getStatus);

    router.route("/exchange").get(...validateGetExchange, getExchange);

    router
        .route("/backtest")
        .post(validateImperatively(validatePostBacktest), postBacktest);

    return router;
};

export default createApiRouter;

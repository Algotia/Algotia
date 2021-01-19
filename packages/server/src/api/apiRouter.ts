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
    requireInit,
    validateGetStrategy,
    getStrategy,
} from "./routes";
import {
    postStrategy,
    validatePostStrategy,
} from "./routes/strategy/postStrategy";

const createApiRouter = (configurer: Configurer): Router => {
    const router = Router();

    router
        .route("/init")
        .get(...validateGetInit, getInit(configurer))
        .post(...validatePostInit(configurer), postInit(configurer));

    router.use(requireInit(configurer));

    router
        .route("/strategy/:fileName")
        .get(...validateGetStrategy(true), getStrategy(configurer));

    router
        .route("/strategy")
        .get(...validateGetStrategy(), getStrategy(configurer));

    router
        .route("/strategy")
        .post(...validatePostStrategy, postStrategy(configurer));

    router.route("/status").get(...validateGetStatus, getStatus);

    router.route("/exchange").get(...validateGetExchange, getExchange);

    router
        .route("/backtest")
        .post(validateImperatively(validatePostBacktest), postBacktest);

    return router;
};

export default createApiRouter;

import { Router } from "express";
import { Configurer } from "../../../utils";
import { getStrategy, validateGetStrategy } from "./get";
import { postOpenStrategy, validatePostOpenStrategy } from "./open";
import { postStrategy, validatePostStrategy } from "./post";

export const strategyRoute = (router: Router, configurer: Configurer) => {
    router
        .route("/strategy/open/:fileName")
        .post(...validatePostOpenStrategy, postOpenStrategy(configurer));

    router
        .route("/strategy/:fileName")
        .get(...validateGetStrategy(true), getStrategy(configurer));

    router
        .route("/strategy")
        .get(...validateGetStrategy(), getStrategy(configurer));

    router
        .route("/strategy")
        .post(...validatePostStrategy, postStrategy(configurer));
};

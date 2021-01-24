import { Router } from "express";
import { Configurer } from "../../../utils";
import { getInit, validateGetInit } from "./get";
import { postInit, validatePostInit } from "./post";

export const initRoute = (router: Router, configurer: Configurer) => {
    router
        .route("/init")
        .get(...validateGetInit, getInit(configurer))
        .post(...validatePostInit(configurer), postInit(configurer));
};

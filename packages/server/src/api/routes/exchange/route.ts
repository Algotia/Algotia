import { Router } from "express";
import { getExchange, validateGetExchange } from "./get";

export const exchangeRoute = (router: Router) => {
    router.route("/exchange").get(...validateGetExchange, getExchange);
};

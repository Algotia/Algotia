import { Router } from "express";
import { getStatus, validateGetStatus } from "./get";

const statusRoute = (router: Router) => {
    router.route("/status").get(...validateGetStatus, getStatus);
};

export { statusRoute };

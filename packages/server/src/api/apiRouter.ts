import { Router } from "express";
import { Configurer, validateImperatively } from "../utils";
import { requireInit } from "./middleware/";
import {
    configRoute,
    initRoute,
    strategyRoute,
    statusRoute,
	backtestRoute,
	exchangeRoute
} from "./routes";

const createApiRouter = (configurer: Configurer): Router => {
    const router = Router();

    router.use(requireInit(configurer));

    configRoute(router, configurer);

    initRoute(router, configurer);

    strategyRoute(router, configurer);

    statusRoute(router);

    backtestRoute(router);

    exchangeRoute(router);

    return router;
};

export default createApiRouter;

import { Router } from "express";
import { Configurer } from "../../../utils";
import { getConfig, validateGetConfig } from "./get";

export const configRoute = (router: Router, configurer: Configurer) => {
    router.get(
        "/config/:key",
        ...validateGetConfig(configurer, true),
        getConfig(configurer)
    );

    router.get(
        "/config",
        ...validateGetConfig(configurer),
        getConfig(configurer)
    );
};

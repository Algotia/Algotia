import { ConfigOptions, IRequest, IResponse } from "../../../types";
import { Configurer } from "../../../utils";
import { verify, initSteps } from "./steps";
import { param, query, body, validationResult } from "express-validator";
import node_path from "path";
import fs from "fs";

interface GetInitResponseBody {
    init: boolean;
}

const validateGetInit = [
    param("*").isEmpty().withMessage("Params fields must be empty"),
    query("*").isEmpty().withMessage("Query fields must be empty"),
    body("*").isEmpty().withMessage("Body fields must be empty"),
];

const getInit = (configurer: Configurer) => {
    return (req: IRequest, res: IResponse<GetInitResponseBody>) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const hasStrategytDir = configurer.has("strategyDir");
            const strategyDir = configurer.get("strategyDir");

            if (!hasStrategytDir) return res.status(200).json({ init: false });
            if (strategyDir && !fs.existsSync(strategyDir)) {
                return res.status(200).json({ init: false });
            } else {
                const init = verify(configurer);
                return res.status(200).json({ init });
            }
        } catch (err) {
            const error = err;
            return res.status(500).json(error);
        }
    };
};

interface PostInitRequestBody extends ConfigOptions {}

interface PostInitResponseBody extends GetInitResponseBody {}

const validatePostInit = [
    body("port").isInt().isPort().optional(),
    body("strategyDir").isString().bail(),
];

const postInit = (configurer: Configurer) => {
    return async (
        req: IRequest<never, PostInitResponseBody, PostInitRequestBody>,
        res: IResponse<PostInitResponseBody>
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const options = req.body;

        configurer.set("strategyDir", options.strategyDir, true);

        for (const step of initSteps) {
            try {
                await step(configurer);
            } catch (err) {
                return res.status(500).json({ errors: [err["message"]] });
            }
        }
        return res.status(200).json({ init: true });
    };
};

export { getInit, validateGetInit, postInit, validatePostInit };

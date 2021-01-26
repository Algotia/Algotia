import { ConfigOptions, IRequest, IResponse } from "@algotia/types";
import { Configurer } from "../../../utils";
import { initSteps } from "./service";
import { body, validationResult, ValidationChain } from "express-validator";
import fs from "fs";

interface PostInitRequestBody extends ConfigOptions {}

interface PostInitResponseBody {
    results: true;
}

export const validatePostInit = (configurer: Configurer): ValidationChain[] => [
    body("port").isInt().isPort(),
    body("strategyDir")
        .isString()
        .bail()
        .custom((strategyDir) => {
            if (configurer.has("strategyDir") && fs.existsSync(strategyDir)) {
                throw new Error(
                    `Strategy dir already exists at ${configurer.get(
                        "strategyDir"
                    )}`
                );
            }
            return true;
        }),
];

export const postInit = (configurer: Configurer) => {
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
        configurer.set("port", options.port, true);

        for (const step of initSteps) {
            try {
                await step(configurer);
            } catch (err) {
                return res.status(500).json({ errors: [err["message"]] });
            }
        }
        return res.status(200).json({ results: true });
    };
};

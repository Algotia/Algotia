import { IRequest, IResponse } from "@algotia/types";
import { Configurer } from "../../../utils";
import { verify } from "./service";
import { param, query, body, validationResult } from "express-validator";
import node_path from "path";
import fs from "fs";
import { homedir } from "os";

interface GetInitResponseBody {
    init: boolean;
    initialConfig?: string;
}

export const validateGetInit = [
    param("*").isEmpty().withMessage("Params fields must be empty"),
    query("*").isEmpty().withMessage("Query fields must be empty"),
    body("*").isEmpty().withMessage("Body fields must be empty"),
];

export const getInit = (configurer: Configurer) => {
    return (req: IRequest, res: IResponse<GetInitResponseBody>) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const getInitialConfig = () => {
                return JSON.stringify(
                    {
                        port: 2008,
                        strategyDir: node_path.join(homedir(), "algotia/"),
                    },
                    null,
                    2
                );
            };

            const getFalseBody = () => {
                const initialConfig = getInitialConfig();
                return {
                    init: false,
                    initialConfig,
                };
            };

            const hasStrategytDir = configurer.has("strategyDir");
            const strategyDir = configurer.get("strategyDir");

            if (!hasStrategytDir) return res.status(200).json(getFalseBody());
            if (hasStrategytDir && !fs.existsSync(strategyDir)) {
                configurer.clear(true);
                return res.status(200).json(getFalseBody());
            } else {
                const init = verify(configurer);
                return res.status(200).json(init ? { init } : getFalseBody());
            }
        } catch (err) {
            const error = err;
            return res.status(500).json(error);
        }
    };
};

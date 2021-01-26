import { param, ValidationChain, validationResult } from "express-validator";
import { ConfigOptions, IRequest, IResponse } from "@algotia/types";
import { Configurer } from "../../../utils";

const validateGetConfig = (
    configurer: Configurer,
    withKey = false
): ValidationChain[] => {
    if (withKey) {
        return [
            param("key")
                .isIn(Array.from(configurer.keys()))
                .withMessage(
                    "Key must be a key of the ConfigOptions interface"
                ),
        ];
    }
    return [param().isEmpty()];
};

interface GetConfigRequestParams {
    key?: keyof ConfigOptions;
}

const getConfig = (configurer: Configurer) => {
    return (req: IRequest<GetConfigRequestParams>, res: IResponse) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const key = req.params.key;
        if (key) {
            return res.json({ [key]: configurer.get(key) });
        }

        return res.json(Object.fromEntries(configurer));
    };
};

export { getConfig, validateGetConfig };

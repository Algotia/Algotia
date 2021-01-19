import {
    body,
    param,
    query,
    ValidationChain,
    validationResult,
} from "express-validator";
import { IRequest, IResponse } from "../../../types";
import { Configurer } from "../../../utils";
import node_path from "path";
import getAllStrategies, {
    GetAllStrategiesResponseBody,
} from "./getAllStrategies";
import getSingleStrategy, {
    GetSingleStrategyResponseBody,
} from "./getSingleStrategy";

interface GetStrategyRequestParams {
    fileName?: string;
}

const validateGetStrategy = (withFileName = false): ValidationChain[] => {
    const baseValidation = [
        body("*").isEmpty().withMessage("Body should be empty"),
        query("*").isEmpty().withMessage("Query should be empty"),
    ];

    if (withFileName) {
        return [...baseValidation, param("fileName").isString()];
    } else {
        return [
            ...baseValidation,
            param("*").isEmpty().withMessage("Params should be empty"),
        ];
    }
};

const getStrategy = (configurer: Configurer) => {
    return (
        req: IRequest<
            GetStrategyRequestParams,
            GetAllStrategiesResponseBody | GetSingleStrategyResponseBody,
            never
        >,
        res: IResponse<
            GetAllStrategiesResponseBody | GetSingleStrategyResponseBody
        >
    ) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }

        const { fileName } = req.params;

        const strategyDir = node_path.join(
            configurer.get("strategyDir"),
            "/strategies"
        );

        try {
            if (fileName) {
                const strategy = getSingleStrategy(fileName, strategyDir);
                return res.status(200).json(strategy);
            } else {
                const strategies = getAllStrategies(strategyDir);
                return res.status(200).json(strategies);
            }
        } catch (err) {
            return res.status(500).json({
                errors: [err["message"]],
            });
        }
    };
};

export { getStrategy, validateGetStrategy };

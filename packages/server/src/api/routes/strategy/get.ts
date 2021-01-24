import {
    body,
    param,
    query,
    ValidationChain,
    validationResult,
} from "express-validator";
import { StrategyMetaData } from "../../../types";
import { IRequest, IResponse } from "../../../types";
import { Configurer, getStrategyMeta } from "../../../utils";
import { StrategyData } from "../../../types";
import node_path from "path";
import fs from "fs";

interface GetSingleStrategyResponseBody extends StrategyData {}

interface GetAllStrategiesResponseBody {
    strategies: StrategyMetaData[];
}

const getAllStrategies = (
    strategyDir: string
): GetAllStrategiesResponseBody => {
    const strategyDirContents = fs.readdirSync(strategyDir);

    const strategies = strategyDirContents.reduce<StrategyMetaData[]>(
        (acc, cur) => {
            const filePath = node_path.join(strategyDir, cur);

            try {
                const meta = getStrategyMeta(filePath);
                acc.push(meta);
            } catch (err) {}
            return acc;
        },
        []
    );
    return { strategies };
};

const getSingleStrategy = (
    fileName: string,
    strategyDir: string
): GetSingleStrategyResponseBody => {
    const strategyDirContents = fs.readdirSync(strategyDir);

    fileName = strategyDirContents.find((path) => {
        return path === fileName;
    });

    if (!fileName) {
        throw new Error(`No strategy with file name ${fileName}`);
    }

    const strategyPath = node_path.join(strategyDir, fileName);

    const meta = getStrategyMeta(strategyPath);
    const value = fs.readFileSync(strategyPath, { encoding: "utf8" });

    return {
        ...meta,
        value,
    };
};

interface GetStrategyRequestParams {
    fileName?: string;
}

export const validateGetStrategy = (
    withFileName = false
): ValidationChain[] => {
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

export const getStrategy = (configurer: Configurer) => {
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

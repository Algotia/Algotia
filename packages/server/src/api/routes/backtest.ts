import {
    AllowedExchangeIDs,
    BacktestResults,
    backfill,
    backtest,
    ExchangeID,
    OHLCV,
    parsePeriod,
    simulateExchange,
} from "@algotia/core";
import { body, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../types/";
import { getExchange } from "../../utils";
import node_path from "path";
import fs from "fs";

interface ReqBody {
    strategyPath: string;
    exchange: ExchangeID;
    period: string;
    pair: string;
    from: number;
    to: number;
    initialBalance: Record<string, number>;
}

interface ResBody {
    candles: OHLCV[];
    results: BacktestResults;
}

const validatePostBacktest = [
    body("exchange")
        .isString()
        .bail()
        .custom((exchangeId) => {
            if (!AllowedExchangeIDs.includes(exchangeId)) {
                throw `Exchange ID ${exchangeId} is not an allowed exchange ID`;
            }
            return true;
        }),
    body("initialBalance")
        .notEmpty()
        .withMessage("Must provide initialBalance")
        .bail()
        .custom(async (initialBalance, { req }) => {
            const exchange = await getExchange(req.body.exchange);
            for (const currency of Object.keys(initialBalance)) {
                if (!Object.keys(exchange.currencies).includes(currency)) {
                    throw new Error(
                        `Currency ${currency} does not exist on exchange ${exchange.id}`
                    );
                }
                if (typeof initialBalance[currency] !== "number") {
                    throw new Error(
                        `Initial balance must be type of [key: string]: value number`
                    );
                }
            }
            return true;
        }),

    body("period")
        .isString()
        .bail()
        .custom(async (period, { req }) => {
            const exchange = await getExchange(req.body.exchange);
            const allowedPeriods = Object.keys(exchange.timeframes);
            if (!allowedPeriods.includes(period)) {
                throw new Error(`Period ${period} is not an allowed period.`);
            }
            return true;
        }),
    body("pair")
        .isString()
        .bail()
        .custom(async (pair, { req }) => {
            const exchange = await getExchange(req.body.exchange);
            const symbols = exchange.symbols;
            if (!symbols.includes(pair)) {
                throw new Error(`Pair ${pair} is not an allowed pair.`);
            }
            return true;
        }),
    body("to")
        .isInt({ lt: Date.now() })
        .withMessage('"to" cannot be a date in the future'),
    body("from")
        .isInt()
        .bail()
        .custom((from, { req }) => {
            const { period, to } = req.body;
            const { periodMs, unitLabel, amount } = parsePeriod(period);
            if (to - from < periodMs) {
                throw new Error(
                    `"to" and "from" must be at least ${amount}${unitLabel} apart`
                );
            }
            return true;
        }),
    body("strategyPath")
        .isString()
        .bail()
        .custom((path) => {
            if (!node_path.isAbsolute(path)) {
                throw `Path ${path} is not an absoulte path`;
            }
            if (!fs.existsSync(path)) {
                throw `Path to strategy ${path} does not exist`;
            }
            if (!fs.statSync(path).isFile) {
                throw `Path to strategy ${path} is not a file`;
            }
            try {
                fs.accessSync(path, fs.constants.R_OK);
            } catch (err) {
                throw `Permission denied: access path ${path}`;
            }
            if (typeof require(path) !== "function") {
                `Path ${path} does not export a function`;
            }
            return true;
        })
        .bail()
        .customSanitizer((path) => {
            return fs.realpathSync(path);
        }),
];

const postBacktest = async (
    req: IRequest<never, ResBody, ReqBody>,
    res: IResponse<ResBody>
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        exchange: exchangeId,
        from,
        to,
        period,
        pair,
        strategyPath,
        initialBalance,
    } = req.body;

    const realExchange = await getExchange(exchangeId);

    const simulatedExchange = simulateExchange({
        derviesFrom: realExchange,
        initialBalance,
    });

    const strategy = require(strategyPath);

    const candles = await backfill({
        from,
        to,
        pair,
        period,
        exchange: simulatedExchange.exchange,
    });

    const results = await backtest({
        data: candles,
        strategy,
        simulatedExchange,
    });

    return res.status(200).json({
        candles,
        results,
    });
};

export { postBacktest, validatePostBacktest };

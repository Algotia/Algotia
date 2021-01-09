import { AllowedExchangeIDs, ExchangeID } from "@algotia/core";
import { query, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../types";
import { getExchange as getCachedExchange } from "../../utils";

interface GetExchangeParams {
    id: ExchangeID;
    timeframes?: boolean;
    symbols?: boolean;
    currencies?: boolean;
    markets?: boolean;
}

interface GetExchangeResBody {
    timeframes?: Record<string, string>;
    symbols?: string[];
    currencies?: Record<string, any>;
    markets?: Record<string, any>;
}

const validateGetExchange = [
    query("id")
        .isIn([...AllowedExchangeIDs])
        .withMessage((value) => `${value} is not a valid exchange ID`),
    query("timeframes").isBoolean().optional(),
    query("symbols").isBoolean().optional(),
    query("currencies").isBoolean().optional(),
    query("markets").isBoolean().optional(),
];

const getExchange = async (
    req: IRequest<GetExchangeParams>,
    res: IResponse<GetExchangeResBody>
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        id: exchangeId,
        symbols,
        timeframes,
        currencies,
        markets,
    } = req.query;
    const exchange = await getCachedExchange(exchangeId as ExchangeID);

    let response: GetExchangeResBody;

    if (symbols) {
        response = Object.assign({}, response, {
            symbols: exchange.symbols,
        });
    }

    if (timeframes) {
        response = Object.assign({}, response, {
            timeframes: exchange.timeframes,
        });
    }

    if (currencies) {
        response = Object.assign({}, response, {
            currencies: exchange.currencies,
        });
    }

    if (markets) {
        response = Object.assign({}, response, {
            currencies: exchange.markets,
        });
    }

    return res.status(200).json(response);
};

export { getExchange, validateGetExchange };

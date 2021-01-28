import { AllowedExchangeIDs, ExchangeID } from "@algotia/core";
import { IRequest, IResponse } from "@algotia/types";
import { validationResult } from "express-validator";
import { check } from "express-validator/src/middlewares/check";
import { getExchange } from "../../../utils";
import OPCache from "op-cache";

type ExchangeStatuses = Record<ExchangeID, boolean>;

interface GetStatusResBody {
    exchanges: ExchangeStatuses;
}

interface Mapped {
    exchanges: ExchangeStatuses;
    lastSet: number;
}

const cache = new OPCache<Mapped>();

const validateGetStatus = [check("*", ["body", "query", "params"]).isEmpty()];

const fetchStatus = async (): Promise<ExchangeStatuses> => {
    const getSingleStatus = async (id: ExchangeID): Promise<boolean> => {
        const exchange = await getExchange(id);
        const { status } = await exchange.fetchStatus();
        return status === "ok";
    };

    let statuses: ExchangeStatuses;

    for (const exchangeId of AllowedExchangeIDs) {
        const singleStatus = await getSingleStatus(exchangeId);
        statuses = Object.assign({}, statuses, { [exchangeId]: singleStatus });
    }

    return statuses;
};

const getStatus = async (
    req: IRequest<never, never, GetStatusResBody, never>,
    res: IResponse<GetStatusResBody>
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!cache.has("lastSet") || Date.now() - cache.get("lastSet") > 60000) {
        const exchangeStatuses = await fetchStatus();
        cache.set("exchanges", exchangeStatuses).set("lastSet", Date.now());
    }

    return res.json({ exchanges: cache.get("exchanges") });
};

export { getStatus, validateGetStatus };

import { createExchange, Exchange, ExchangeID } from "@algotia/core";
import OPCache from "op-cache";

const cache = new OPCache<Record<ExchangeID, Exchange>>();

const getExchange = async (id: ExchangeID): Promise<Exchange> => {
    if (!cache.has(id)) {
        const exchange = createExchange(id);

        await exchange.loadMarkets();

        cache.set(id, exchange);
    }
    return cache.get(id);
};

export { getExchange };

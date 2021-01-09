import { createExchange, Exchange, ExchangeID } from "@algotia/core";

let cache: Record<ExchangeID, Exchange>;

const getExchange = async (exchangeId: ExchangeID) => {
    if (!cache || !cache[exchangeId]) {
        const exchange = createExchange(exchangeId);
        await exchange.loadMarkets();
        cache = {
            ...cache,
            [exchangeId]: exchange,
        };
    }

    return cache[exchangeId];
};

export default getExchange;

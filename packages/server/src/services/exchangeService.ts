import { createExchange } from "@algotia/core";
import { Exchange, ExchangeIDs } from "@algotia/types";
import { exchangeCache } from "../utils";

export class ExchangeService {
    public async getExchange(id: ExchangeIDs): Promise<Exchange> {
        if (!exchangeCache.has(id)) {
            const exchange = createExchange(id);

            await exchange.loadMarkets();

            exchangeCache.set(id, exchange);
        }

        return exchangeCache.get(id);
    }
}

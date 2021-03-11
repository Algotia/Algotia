import { createExchange } from "@algotia/core";
import { ExchangeIDs, Exchange } from "@algotia/types";
import { exchangeCache } from "../utils";

export type ExchangeStatuses = {
    [key in ExchangeIDs]: boolean;
};

export class ExchangeService {
    public async getExchange(id: ExchangeIDs): Promise<Exchange> {
        if (!exchangeCache.has(id)) {
            const exchange = createExchange(id);

            await exchange.loadMarkets();

            exchangeCache.set(id, exchange);
        }

        return exchangeCache.get(id);
    }

    public async getExchangeStatuses(): Promise<ExchangeStatuses> {
        let statuses: ExchangeStatuses;

        const exchangeIds = Object.values(ExchangeIDs)
            .map((k) => ExchangeIDs[k])
            .filter((s) => !(parseInt(s) >= 0));

        for (const id of exchangeIds) {
            if (isNaN(Number(id))) {
                const exchange = await this.getExchange(id);
                let status: boolean;
                try {
                    const statusRes = await exchange.fetchStatus();
                    status = statusRes.status === "ok";
                } catch (err) {
                    status = false;
                }
                statuses = {
                    ...statuses,
                    [id]: status,
                };
            }
        }

        return statuses;
    }
}

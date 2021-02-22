import { AllowedExchangeIDs, Exchange, ExchangeID } from "@algotia/types";
import { Market } from "@algotia/ccxt";
import { Controller, Get, Path, Query, Route } from "tsoa";
import { ExchangeService } from "../services";

type ExchangeStatuses = {
    [key in ExchangeID]: boolean;
};

@Route("exchange")
export class ExchangeController extends Controller {
    exchangeService = new ExchangeService();

    @Get("ids")
    public getExchangeIds(): string[] {
        return [...AllowedExchangeIDs];
    }

    @Get("statuses")
    public async getExchangeStatuses(): Promise<ExchangeStatuses> {
        let statuses: ExchangeStatuses;
        for (const id of AllowedExchangeIDs) {
            const exchange = await this.exchangeService.getExchange(id);
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
        return statuses;
    }

    @Get("{id}/market")
    public async getMarket(
        @Path() id: ExchangeID,
        @Query() pair: string
    ): Promise<Market> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.markets[pair];
    }

    @Get("{id}/timeframes")
    public async getTimeFrames(
        @Path() id: ExchangeID
    ): Promise<Exchange["timeframes"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.timeframes;
    }

    @Get("{id}/pairs")
    public async getPairs(
        @Path() id: ExchangeID
    ): Promise<Exchange["symbols"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.symbols;
    }

    @Get("{id}/currencies")
    public async getCurrencies(
        @Path() id: ExchangeID
    ): Promise<Exchange["currencies"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.currencies;
    }
}

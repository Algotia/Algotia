import { Market, Exchange, ExchangeIDs } from "@algotia/types";
import { Controller, Get, Path, Query, Route } from "tsoa";
import { ExchangeService, ExchangeStatuses } from "../services";

@Route("exchange")
export class ExchangeController extends Controller {
    exchangeService = new ExchangeService();

    @Get("ids")
    public getExchangeIds(): ExchangeIDs[] {
        return Object.values(ExchangeIDs)
            .map((k) => ExchangeIDs[k])
            .filter((s) => !(parseInt(s) >= 0));
    }

    @Get("statuses")
    public async getExchangeStatuses(): Promise<ExchangeStatuses> {
        return await this.exchangeService.getExchangeStatuses();
    }

    @Get("{id}/market")
    public async getMarket(
        @Path() id: ExchangeIDs,
        @Query() pair: string
    ): Promise<Market> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.markets[pair];
    }

    @Get("{id}/timeframes")
    public async getTimeFrames(
        @Path() id: ExchangeIDs
    ): Promise<Exchange["timeframes"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.timeframes;
    }

    @Get("{id}/pairs")
    public async getPairs(
        @Path() id: ExchangeIDs
    ): Promise<Exchange["symbols"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.symbols;
    }

    @Get("{id}/currencies")
    public async getCurrencies(
        @Path() id: ExchangeIDs
    ): Promise<Exchange["currencies"]> {
        const exchange = await this.exchangeService.getExchange(id);
        return exchange.currencies;
    }
}

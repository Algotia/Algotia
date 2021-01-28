import { Exchange, ExchangeID } from "@algotia/core";
import { Controller } from "tsoa";
import { ExchangeService } from "../services";
export declare class ExchangeController extends Controller {
    exchangeService: ExchangeService;
    getExchangeIds(): string[];
    getExchangeStatuses(): Promise<Record<ExchangeID, boolean>>;
    getMarket(id: ExchangeID, pair: string): Promise<Exchange["markets"][string]>;
    getCurrencies(id: ExchangeID): Promise<Exchange["currencies"]>;
    getTimeFrames(id: ExchangeID): Promise<Exchange["timeframes"]>;
    getPairs(id: ExchangeID): Promise<Exchange["symbols"]>;
}

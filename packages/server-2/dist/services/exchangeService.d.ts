import { Exchange, ExchangeID } from "@algotia/core";
export declare class ExchangeService {
    getExchange(id: ExchangeID): Promise<Exchange>;
}

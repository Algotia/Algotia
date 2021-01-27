import { Exchange, ExchangeID } from "@algotia/core";
declare const getExchange: (id: ExchangeID) => Promise<Exchange>;
export { getExchange };

import { Exchange } from "@algotia/core";
import OPCache from "op-cache";
export declare const exchangeCache: OPCache<Record<"binance" | "kucoin" | "bitfinex", Exchange>>;

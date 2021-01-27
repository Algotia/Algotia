import { Exchange, ExchangeID } from "@algotia/core";
import OPCache from "op-cache";

export const exchangeCache = new OPCache<Record<ExchangeID, Exchange>>();

import { ExchangeIDs, Exchange } from "@algotia/types";
import OPCache from "op-cache";

export const exchangeCache = new OPCache<Record<ExchangeIDs, Exchange>>();

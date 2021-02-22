import { Exchange, ExchangeID } from "@algotia/types";
import OPCache from "op-cache";

export const exchangeCache = new OPCache<Record<ExchangeID, Exchange>>();

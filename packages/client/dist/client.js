"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrategyByFilename = exports.getPairs = exports.getTimeFrames = exports.getMarket = exports.getExchangeStatuses = exports.getExchangeIds = exports.getConfigOptionByKey = exports.getAllConfigOptions = exports.createBacktest = exports.servers = exports.defaults = void 0;
/**
 * @algotia/server-2
 * 0.1.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
const Oazapfts = __importStar(require("oazapfts/lib/runtime"));
const QS = __importStar(require("oazapfts/lib/runtime/query"));
exports.defaults = {
    baseUrl: "http://localhost:2008/api",
};
const oazapfts = Oazapfts.runtime(exports.defaults);
exports.servers = {
    server1: "http://localhost:2008/api"
};
-or - currentPrice__;
{
    balance: Balances;
    openOrders: Order[];
    closedOrders: Order[];
    errors: StrategyError[];
}
;
-or - currentPrice_;
Pick_SimulatedExchangeStore.Exclude_keyofSimulatedExchangeStore.currentTime - or - currentPrice__;
-or - currentPrice_;
candles: OHLCV_Candle[];
;
{
    binance ?  : boolean;
    kucoin ?  : boolean;
    bitfinex ?  : boolean;
}
;
-or - string_;
{
    [key, string];
    number | string;
}
;
function createBacktest(createBacktestOptions, opts) {
    return oazapfts.fetchJson("/backtest", oazapfts.json(Object.assign(Object.assign({}, opts), { method: "POST", body: createBacktestOptions })));
}
exports.createBacktest = createBacktest;
function getAllConfigOptions(opts) {
    return oazapfts.fetchJson("/config", Object.assign({}, opts));
}
exports.getAllConfigOptions = getAllConfigOptions;
function getConfigOptionByKey(key, opts) {
    return oazapfts.fetchJson(`/config/${key}`, Object.assign({}, opts));
}
exports.getConfigOptionByKey = getConfigOptionByKey;
function getExchangeIds(opts) {
    return oazapfts.fetchJson("/exchange/ids", Object.assign({}, opts));
}
exports.getExchangeIds = getExchangeIds;
function getExchangeStatuses(opts) {
    return oazapfts.fetchJson("/exchange/statuses", Object.assign({}, opts));
}
exports.getExchangeStatuses = getExchangeStatuses;
function getMarket(id, pair, opts) {
    return oazapfts.fetchJson(`/exchange/${id}/market${QS.query(QS.form({
        pair
    }))}`, Object.assign({}, opts));
}
exports.getMarket = getMarket;
function getTimeFrames(id, opts) {
    return oazapfts.fetchJson < {
        status: 200,
        data: IDictionary_number - or - string_
    } > (`/exchange/${id}/timeframes`, Object.assign({}, opts));
}
exports.getTimeFrames = getTimeFrames;
function getPairs(id, opts) {
    return oazapfts.fetchJson(`/exchange/${id}/pairs`, Object.assign({}, opts));
}
exports.getPairs = getPairs;
function getStrategyByFilename(fileName, opts) {
    return oazapfts.fetchJson(`/strategy/${fileName}`, Object.assign({}, opts));
}
exports.getStrategyByFilename = getStrategyByFilename;

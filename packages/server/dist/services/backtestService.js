"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacktestService = void 0;
const core_1 = require("@algotia/core");
const exchangeService_1 = require("./exchangeService");
const strategyService_1 = require("./strategyService");
const path_1 = __importDefault(require("path"));
const import_fresh_1 = __importDefault(require("import-fresh"));
class BacktestService {
    constructor() {
        this.exchangeService = new exchangeService_1.ExchangeService();
        this.strategyService = new strategyService_1.StrategyService();
    }
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { exchange: exchangeId, from, to, period, pair, strategyPath, initialBalance, } = options;
            const realExchange = yield this.exchangeService.getExchange(exchangeId);
            const simulated = core_1.simulateExchange({
                derivesFrom: realExchange,
                initialBalance,
            });
            const strategy = path_1.default.isAbsolute(strategyPath)
                ? import_fresh_1.default(strategyPath)
                : yield this.strategyService.import(strategyPath, {
                    pair,
                });
            const candles = yield core_1.backfill({
                from,
                to,
                pair,
                period,
                exchange: simulated.exchange,
            });
            const results = yield core_1.backtest({
                data: candles,
                strategy,
                simulatedExchange: simulated,
            });
            return {
                results,
                candles,
            };
        });
    }
}
exports.BacktestService = BacktestService;
//# sourceMappingURL=backtestService.js.map
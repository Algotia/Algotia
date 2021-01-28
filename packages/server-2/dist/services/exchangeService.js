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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeService = void 0;
const core_1 = require("@algotia/core");
const utils_1 = require("../utils");
class ExchangeService {
    getExchange(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!utils_1.exchangeCache.has(id)) {
                const exchange = core_1.createExchange(id);
                yield exchange.loadMarkets();
                utils_1.exchangeCache.set(id, exchange);
            }
            return utils_1.exchangeCache.get(id);
        });
    }
}
exports.ExchangeService = ExchangeService;
//# sourceMappingURL=exchangeService.js.map
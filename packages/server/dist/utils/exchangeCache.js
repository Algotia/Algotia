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
exports.getExchange = void 0;
const core_1 = require("@algotia/core");
const op_cache_1 = __importDefault(require("op-cache"));
const cache = new op_cache_1.default();
const getExchange = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cache.has(id)) {
        const exchange = core_1.createExchange(id);
        yield exchange.loadMarkets();
        cache.set(id, exchange);
    }
    return cache.get(id);
});
exports.getExchange = getExchange;
//# sourceMappingURL=exchangeCache.js.map
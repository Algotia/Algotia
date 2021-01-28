"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ExchangeController = void 0;
const core_1 = require("@algotia/core");
const tsoa_1 = require("tsoa");
const services_1 = require("../services");
let ExchangeController = class ExchangeController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.exchangeService = new services_1.ExchangeService();
    }
    getExchangeIds() {
        return [...core_1.AllowedExchangeIDs];
    }
    getExchangeStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            let statuses;
            for (const id of core_1.AllowedExchangeIDs) {
                const exchange = yield this.exchangeService.getExchange(id);
                let status;
                try {
                    const statusRes = yield exchange.fetchStatus();
                    status = statusRes.status === "ok";
                }
                catch (err) {
                    status = false;
                }
                statuses = Object.assign(Object.assign({}, statuses), { [id]: status });
            }
            return statuses;
        });
    }
    getMarket(id, pair) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = yield this.exchangeService.getExchange(id);
            return exchange.markets[pair];
        });
    }
    getCurrencies(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = yield this.exchangeService.getExchange(id);
            return exchange.currencies;
        });
    }
    getTimeFrames(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = yield this.exchangeService.getExchange(id);
            return exchange.timeframes;
        });
    }
    getPairs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = yield this.exchangeService.getExchange(id);
            return exchange.symbols;
        });
    }
};
__decorate([
    tsoa_1.Get("ids"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ExchangeController.prototype, "getExchangeIds", null);
__decorate([
    tsoa_1.Get("statuses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getExchangeStatuses", null);
__decorate([
    tsoa_1.Get("{id}/market"),
    __param(0, tsoa_1.Path()),
    __param(1, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getMarket", null);
__decorate([
    tsoa_1.Get("{id}/currencies"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getCurrencies", null);
__decorate([
    tsoa_1.Get("{id}/timeframes"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getTimeFrames", null);
__decorate([
    tsoa_1.Get("{id}/pairs"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExchangeController.prototype, "getPairs", null);
ExchangeController = __decorate([
    tsoa_1.Route("exchange")
], ExchangeController);
exports.ExchangeController = ExchangeController;
//# sourceMappingURL=exchangeController.js.map
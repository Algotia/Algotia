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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyController = void 0;
const tsoa_1 = require("tsoa");
const services_1 = require("../services");
let StrategyController = class StrategyController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.strategyService = new services_1.StrategyService();
    }
    getAllStrategyMetaData() {
        return this.strategyService.getAllStrategyMetaData();
    }
    getStrategyByFilename(fileName) {
        return this.strategyService.getStrategy(fileName);
    }
};
__decorate([
    tsoa_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], StrategyController.prototype, "getAllStrategyMetaData", null);
__decorate([
    tsoa_1.Get("{fileName}"),
    __param(0, tsoa_1.Path()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], StrategyController.prototype, "getStrategyByFilename", null);
StrategyController = __decorate([
    tsoa_1.Route("strategy")
], StrategyController);
exports.StrategyController = StrategyController;
//# sourceMappingURL=strategyController.js.map
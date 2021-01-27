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
exports.Service = void 0;
const request_1 = require("../core/request");
class Service {
    /**
     * @returns CreateBacktestResult Ok
     * @throws ApiError
     */
    static createBacktest({ requestBody, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'POST',
                path: `/backtest`,
                body: requestBody,
            });
            return result.body;
        });
    }
    /**
     * @returns any Ok
     * @throws ApiError
     */
    static getAllConfigOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/config`,
            });
            return result.body;
        });
    }
    /**
     * @returns any Ok
     * @throws ApiError
     */
    static getConfigOptionByKey({ key, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/config/${key}`,
            });
            return result.body;
        });
    }
    /**
     * @returns string Ok
     * @throws ApiError
     */
    static getExchangeIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/exchange/ids`,
            });
            return result.body;
        });
    }
    /**
     * @returns Record_ExchangeID_boolean_ Ok
     * @throws ApiError
     */
    static getExchangeStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/exchange/statuses`,
            });
            return result.body;
        });
    }
    /**
     * @returns Market Ok
     * @throws ApiError
     */
    static getMarket({ id, pair, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/exchange/${id}/market`,
                query: {
                    'pair': pair,
                },
            });
            return result.body;
        });
    }
    /**
     * @returns IDictionary_number_or_string_ Ok
     * @throws ApiError
     */
    static getTimeFrames({ id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/exchange/${id}/timeframes`,
            });
            return result.body;
        });
    }
    /**
     * @returns string Ok
     * @throws ApiError
     */
    static getPairs({ id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/exchange/${id}/pairs`,
            });
            return result.body;
        });
    }
    /**
     * @returns GetStrategyResult Ok
     * @throws ApiError
     */
    static getStrategyByFilename({ fileName, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request_1.request({
                method: 'GET',
                path: `/strategy/${fileName}`,
            });
            return result.body;
        });
    }
}
exports.Service = Service;

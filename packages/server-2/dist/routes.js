"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const backtestController_1 = require("./controllers/backtestController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const configController_1 = require("./controllers/configController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const exchangeController_1 = require("./controllers/exchangeController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const strategyController_1 = require("./controllers/strategyController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "Balance": {
        "dataType": "refObject",
        "properties": {
            "free": { "dataType": "double", "required": true },
            "used": { "dataType": "double", "required": true },
            "total": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Balances": {
        "dataType": "refObject",
        "properties": {
            "info": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Fee": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["taker"] }, { "dataType": "enum", "enums": ["maker"] }], "required": true },
            "currency": { "dataType": "string", "required": true },
            "rate": { "dataType": "double", "required": true },
            "cost": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trade": {
        "dataType": "refObject",
        "properties": {
            "amount": { "dataType": "double", "required": true },
            "datetime": { "dataType": "string", "required": true },
            "id": { "dataType": "string", "required": true },
            "info": { "dataType": "any", "required": true },
            "order": { "dataType": "string" },
            "price": { "dataType": "double", "required": true },
            "timestamp": { "dataType": "double", "required": true },
            "type": { "dataType": "string" },
            "side": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["buy"] }, { "dataType": "enum", "enums": ["sell"] }], "required": true },
            "symbol": { "dataType": "string", "required": true },
            "takerOrMaker": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["taker"] }, { "dataType": "enum", "enums": ["maker"] }], "required": true },
            "cost": { "dataType": "double", "required": true },
            "fee": { "ref": "Fee", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "clientOrderId": { "dataType": "string", "required": true },
            "datetime": { "dataType": "string", "required": true },
            "timestamp": { "dataType": "double", "required": true },
            "lastTradeTimestamp": { "dataType": "double", "required": true },
            "status": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["open"] }, { "dataType": "enum", "enums": ["closed"] }, { "dataType": "enum", "enums": ["canceled"] }], "required": true },
            "symbol": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "timeInForce": { "dataType": "string" },
            "side": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["buy"] }, { "dataType": "enum", "enums": ["sell"] }], "required": true },
            "price": { "dataType": "double", "required": true },
            "average": { "dataType": "double" },
            "amount": { "dataType": "double", "required": true },
            "filled": { "dataType": "double", "required": true },
            "remaining": { "dataType": "double", "required": true },
            "cost": { "dataType": "double", "required": true },
            "trades": { "dataType": "array", "array": { "ref": "Trade" }, "required": true },
            "fee": { "ref": "Fee", "required": true },
            "info": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StrategyError": {
        "dataType": "refObject",
        "properties": {
            "timestamp": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "balance": { "ref": "Balances", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_SimulatedExchangeStore.Exclude_keyofSimulatedExchangeStore.currentTime-or-currentPrice__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "balance": { "ref": "Balances", "required": true }, "openOrders": { "dataType": "array", "array": { "ref": "Order" }, "required": true }, "closedOrders": { "dataType": "array", "array": { "ref": "Order" }, "required": true }, "errors": { "dataType": "array", "array": { "ref": "StrategyError" }, "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_SimulatedExchangeStore.currentTime-or-currentPrice_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_SimulatedExchangeStore.Exclude_keyofSimulatedExchangeStore.currentTime-or-currentPrice__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BacktestResults": {
        "dataType": "refAlias",
        "type": { "ref": "Omit_SimulatedExchangeStore.currentTime-or-currentPrice_", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OHLCV_Candle": {
        "dataType": "refObject",
        "properties": {
            "timestamp": { "dataType": "double", "required": true },
            "open": { "dataType": "double", "required": true },
            "high": { "dataType": "double", "required": true },
            "low": { "dataType": "double", "required": true },
            "close": { "dataType": "double", "required": true },
            "volume": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBacktestResult": {
        "dataType": "refObject",
        "properties": {
            "results": { "ref": "BacktestResults", "required": true },
            "candles": { "dataType": "array", "array": { "ref": "OHLCV_Candle" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExchangeID": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["binance"] }, { "dataType": "enum", "enums": ["kucoin"] }, { "dataType": "enum", "enums": ["bitfinex"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBacktestOptions": {
        "dataType": "refObject",
        "properties": {
            "strategyPath": { "dataType": "string", "required": true },
            "exchange": { "ref": "ExchangeID", "required": true },
            "period": { "dataType": "string", "required": true },
            "pair": { "dataType": "string", "required": true },
            "from": { "dataType": "double", "required": true },
            "to": { "dataType": "double", "required": true },
            "initialBalance": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "double" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_ExchangeID.boolean_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "binance": { "dataType": "boolean" }, "kucoin": { "dataType": "boolean" }, "bitfinex": { "dataType": "boolean" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MinMax": {
        "dataType": "refObject",
        "properties": {
            "min": { "dataType": "double", "required": true },
            "max": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Market": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "symbol": { "dataType": "string", "required": true },
            "base": { "dataType": "string", "required": true },
            "quote": { "dataType": "string", "required": true },
            "baseId": { "dataType": "string", "required": true },
            "quoteId": { "dataType": "string", "required": true },
            "type": { "dataType": "string" },
            "spot": { "dataType": "boolean" },
            "margin": { "dataType": "boolean" },
            "swap": { "dataType": "boolean" },
            "future": { "dataType": "boolean" },
            "active": { "dataType": "boolean", "required": true },
            "precision": { "dataType": "nestedObjectLiteral", "nestedProperties": { "price": { "dataType": "double", "required": true }, "amount": { "dataType": "double", "required": true }, "quote": { "dataType": "double", "required": true }, "base": { "dataType": "double", "required": true } }, "required": true },
            "limits": { "dataType": "nestedObjectLiteral", "nestedProperties": { "cost": { "ref": "MinMax" }, "price": { "ref": "MinMax", "required": true }, "amount": { "ref": "MinMax", "required": true } }, "required": true },
            "tierBased": { "dataType": "boolean", "required": true },
            "percentage": { "dataType": "boolean", "required": true },
            "taker": { "dataType": "double", "required": true },
            "maker": { "dataType": "double", "required": true },
            "info": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDictionary_number-or-string_": {
        "dataType": "refObject",
        "properties": {},
        "additionalProperties": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "string" }] },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StrategyMetaData": {
        "dataType": "refObject",
        "properties": {
            "modifiedAt": { "dataType": "double", "required": true },
            "basename": { "dataType": "string", "required": true },
            "path": { "dataType": "string", "required": true },
            "language": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["JavaScript"] }, { "dataType": "enum", "enums": ["TypeScript"] }], "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetStrategyResult": {
        "dataType": "refObject",
        "properties": {
            "value": { "dataType": "string", "required": true },
            "meta": { "ref": "StrategyMetaData", "required": true },
        },
        "additionalProperties": false,
    },
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/api/backtest', function (request, response, next) {
        const args = {
            reqBody: { "in": "body", "name": "reqBody", "required": true, "ref": "CreateBacktestOptions" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new backtestController_1.BacktestController();
        const promise = controller.createBacktest.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/config', function (request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new configController_1.ConfigController();
        const promise = controller.getAllConfigOptions.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/config/:key', function (request, response, next) {
        const args = {
            key: { "in": "path", "name": "key", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["port"] }, { "dataType": "enum", "enums": ["appDir"] }] },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new configController_1.ConfigController();
        const promise = controller.getConfigOptionByKey.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/exchange/ids', function (request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new exchangeController_1.ExchangeController();
        const promise = controller.getExchangeIds.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/exchange/statuses', function (request, response, next) {
        const args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new exchangeController_1.ExchangeController();
        const promise = controller.getExchangeStatuses.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/exchange/:id/market', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "ref": "ExchangeID" },
            pair: { "in": "query", "name": "pair", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new exchangeController_1.ExchangeController();
        const promise = controller.getMarket.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/exchange/:id/timeframes', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "ref": "ExchangeID" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new exchangeController_1.ExchangeController();
        const promise = controller.getTimeFrames.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/exchange/:id/pairs', function (request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "ref": "ExchangeID" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new exchangeController_1.ExchangeController();
        const promise = controller.getPairs.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/strategy/:fileName', function (request, response, next) {
        const args = {
            fileName: { "in": "path", "name": "fileName", "required": true, "dataType": "string" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        const controller = new strategyController_1.StrategyController();
        const promise = controller.getStrategyByFilename.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus();
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data || data === false) { // === false allows boolean result
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map
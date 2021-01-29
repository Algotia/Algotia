/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BacktestController } from './controllers/backtestController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConfigController } from './controllers/configController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExchangeController } from './controllers/exchangeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StrategyController } from './controllers/strategyController';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Balance": {
        "dataType": "refObject",
        "properties": {
            "free": {"dataType":"double","required":true},
            "used": {"dataType":"double","required":true},
            "total": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Fee": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["taker"]},{"dataType":"enum","enums":["maker"]}],"required":true},
            "currency": {"dataType":"string","required":true},
            "rate": {"dataType":"double","required":true},
            "cost": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trade": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"double","required":true},
            "datetime": {"dataType":"string","required":true},
            "id": {"dataType":"string","required":true},
            "info": {"dataType":"any","required":true},
            "order": {"dataType":"string"},
            "price": {"dataType":"double","required":true},
            "timestamp": {"dataType":"double","required":true},
            "type": {"dataType":"string"},
            "side": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["buy"]},{"dataType":"enum","enums":["sell"]}],"required":true},
            "symbol": {"dataType":"string","required":true},
            "takerOrMaker": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["taker"]},{"dataType":"enum","enums":["maker"]}],"required":true},
            "cost": {"dataType":"double","required":true},
            "fee": {"ref":"Fee","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Order": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "clientOrderId": {"dataType":"string","required":true},
            "datetime": {"dataType":"string","required":true},
            "timestamp": {"dataType":"double","required":true},
            "lastTradeTimestamp": {"dataType":"double","required":true},
            "status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["open"]},{"dataType":"enum","enums":["closed"]},{"dataType":"enum","enums":["canceled"]}],"required":true},
            "symbol": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "timeInForce": {"dataType":"string"},
            "side": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["buy"]},{"dataType":"enum","enums":["sell"]}],"required":true},
            "price": {"dataType":"double","required":true},
            "average": {"dataType":"double"},
            "amount": {"dataType":"double","required":true},
            "filled": {"dataType":"double","required":true},
            "remaining": {"dataType":"double","required":true},
            "cost": {"dataType":"double","required":true},
            "trades": {"dataType":"array","array":{"ref":"Trade"},"required":true},
            "fee": {"ref":"Fee","required":true},
            "info": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StrategyError": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"dataType":"double","required":true},
            "message": {"dataType":"string","required":true},
            "balance": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"Balance"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_SimulatedExchangeStore.Exclude_keyofSimulatedExchangeStore.currentTime-or-currentPrice__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"balance":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"Balance"},"required":true},"openOrders":{"dataType":"array","array":{"ref":"Order"},"required":true},"closedOrders":{"dataType":"array","array":{"ref":"Order"},"required":true},"errors":{"dataType":"array","array":{"ref":"StrategyError"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_SimulatedExchangeStore.currentTime-or-currentPrice_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_SimulatedExchangeStore.Exclude_keyofSimulatedExchangeStore.currentTime-or-currentPrice__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BacktestResults": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_SimulatedExchangeStore.currentTime-or-currentPrice_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OHLCV_Candle": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"dataType":"double","required":true},
            "open": {"dataType":"double","required":true},
            "high": {"dataType":"double","required":true},
            "low": {"dataType":"double","required":true},
            "close": {"dataType":"double","required":true},
            "volume": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBacktestResult": {
        "dataType": "refObject",
        "properties": {
            "results": {"ref":"BacktestResults","required":true},
            "candles": {"dataType":"array","array":{"ref":"OHLCV_Candle"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ExchangeID": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["binance"]},{"dataType":"enum","enums":["kucoin"]},{"dataType":"enum","enums":["bitfinex"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBacktestOptions": {
        "dataType": "refObject",
        "properties": {
            "strategyPath": {"dataType":"string","required":true},
            "exchange": {"ref":"ExchangeID","required":true},
            "period": {"dataType":"string","required":true},
            "pair": {"dataType":"string","required":true},
            "from": {"dataType":"double","required":true},
            "to": {"dataType":"double","required":true},
            "initialBalance": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_ExchangeID.boolean_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"binance":{"dataType":"boolean"},"kucoin":{"dataType":"boolean"},"bitfinex":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MinMax": {
        "dataType": "refObject",
        "properties": {
            "min": {"dataType":"double","required":true},
            "max": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Market": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "symbol": {"dataType":"string","required":true},
            "base": {"dataType":"string","required":true},
            "quote": {"dataType":"string","required":true},
            "baseId": {"dataType":"string","required":true},
            "quoteId": {"dataType":"string","required":true},
            "type": {"dataType":"string"},
            "spot": {"dataType":"boolean"},
            "margin": {"dataType":"boolean"},
            "swap": {"dataType":"boolean"},
            "future": {"dataType":"boolean"},
            "active": {"dataType":"boolean","required":true},
            "precision": {"dataType":"nestedObjectLiteral","nestedProperties":{"price":{"dataType":"double","required":true},"amount":{"dataType":"double","required":true},"quote":{"dataType":"double","required":true},"base":{"dataType":"double","required":true}},"required":true},
            "limits": {"dataType":"nestedObjectLiteral","nestedProperties":{"cost":{"ref":"MinMax"},"price":{"ref":"MinMax","required":true},"amount":{"ref":"MinMax","required":true}},"required":true},
            "tierBased": {"dataType":"boolean","required":true},
            "percentage": {"dataType":"boolean","required":true},
            "taker": {"dataType":"double","required":true},
            "maker": {"dataType":"double","required":true},
            "info": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDictionary_number-or-string_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}]},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StrategyMetaData": {
        "dataType": "refObject",
        "properties": {
            "modifiedAt": {"dataType":"double","required":true},
            "basename": {"dataType":"string","required":true},
            "path": {"dataType":"string","required":true},
            "language": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["JavaScript"]},{"dataType":"enum","enums":["TypeScript"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetStrategyResult": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "meta": {"ref":"StrategyMetaData","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "WriteStrategyOptions": {
        "dataType": "refObject",
        "properties": {
            "contents": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/api/backtest',
            function (request: any, response: any, next: any) {
            const args = {
                    reqBody: {"in":"body","name":"reqBody","required":true,"ref":"CreateBacktestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BacktestController();


            const promise = controller.createBacktest.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/config',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ConfigController();


            const promise = controller.getAllConfigOptions.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/config/:key',
            function (request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["port"]},{"dataType":"enum","enums":["appDir"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ConfigController();


            const promise = controller.getConfigOptionByKey.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/exchange/ids',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ExchangeController();


            const promise = controller.getExchangeIds.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/exchange/statuses',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ExchangeController();


            const promise = controller.getExchangeStatuses.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/exchange/:id/market',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"ExchangeID"},
                    pair: {"in":"query","name":"pair","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ExchangeController();


            const promise = controller.getMarket.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/exchange/:id/timeframes',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"ExchangeID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ExchangeController();


            const promise = controller.getTimeFrames.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/exchange/:id/pairs',
            function (request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"ref":"ExchangeID"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ExchangeController();


            const promise = controller.getPairs.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/strategy',
            function (request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StrategyController();


            const promise = controller.getAllStrategies.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/strategy/:fileName',
            function (request: any, response: any, next: any) {
            const args = {
                    fileName: {"in":"path","name":"fileName","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StrategyController();


            const promise = controller.getStrategyByFilename.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/strategy/:fileName',
            function (request: any, response: any, next: any) {
            const args = {
                    fileName: {"in":"path","name":"fileName","required":true,"dataType":"string"},
                    contents: {"in":"body","name":"contents","required":true,"ref":"WriteStrategyOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new StrategyController();


            const promise = controller.writeStrategy.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus();
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data || data === false) { // === false allows boolean result
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }
    
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

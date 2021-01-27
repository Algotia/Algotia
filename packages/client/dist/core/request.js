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
exports.request = void 0;
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
const ApiError_1 = require("./ApiError");
const OpenAPI_1 = require("./OpenAPI");
function isDefined(value) {
    return value !== undefined && value !== null;
}
function isString(value) {
    return typeof value === 'string';
}
function isStringWithValue(value) {
    return isString(value) && value !== '';
}
function isBlob(value) {
    return value instanceof Blob;
}
function getQueryString(params) {
    const qs = [];
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(value => {
                    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
                });
            }
            else {
                qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
            }
        }
    });
    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }
    return '';
}
function getUrl(options) {
    const path = options.path.replace(/[:]/g, '_');
    const url = `${OpenAPI_1.OpenAPI.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
}
function getFormData(params) {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (isDefined(value)) {
            formData.append(key, value);
        }
    });
    return formData;
}
function resolve(resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof resolver === 'function') {
            return resolver();
        }
        return resolver;
    });
}
function getHeaders(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = new Headers(Object.assign(Object.assign({ Accept: 'application/json' }, OpenAPI_1.OpenAPI.HEADERS), options.headers));
        const token = yield resolve(OpenAPI_1.OpenAPI.TOKEN);
        const username = yield resolve(OpenAPI_1.OpenAPI.USERNAME);
        const password = yield resolve(OpenAPI_1.OpenAPI.PASSWORD);
        if (isStringWithValue(token)) {
            headers.append('Authorization', `Bearer ${token}`);
        }
        if (isStringWithValue(username) && isStringWithValue(password)) {
            const credentials = btoa(`${username}:${password}`);
            headers.append('Authorization', `Basic ${credentials}`);
        }
        if (options.body) {
            if (isBlob(options.body)) {
                headers.append('Content-Type', options.body.type || 'application/octet-stream');
            }
            else if (isString(options.body)) {
                headers.append('Content-Type', 'text/plain');
            }
            else {
                headers.append('Content-Type', 'application/json');
            }
        }
        return headers;
    });
}
function getRequestBody(options) {
    if (options.formData) {
        return getFormData(options.formData);
    }
    if (options.body) {
        if (isString(options.body) || isBlob(options.body)) {
            return options.body;
        }
        else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
}
function sendRequest(options, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const request = {
            method: options.method,
            headers: yield getHeaders(options),
            body: getRequestBody(options),
        };
        if (OpenAPI_1.OpenAPI.WITH_CREDENTIALS) {
            request.credentials = 'include';
        }
        return yield fetch(url, request);
    });
}
function getResponseHeader(response, responseHeader) {
    if (responseHeader) {
        const content = response.headers.get(responseHeader);
        if (isString(content)) {
            return content;
        }
    }
    return null;
}
function getResponseBody(response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contentType = response.headers.get('Content-Type');
            if (contentType) {
                const isJSON = contentType.toLowerCase().startsWith('application/json');
                if (isJSON) {
                    return yield response.json();
                }
                else {
                    return yield response.text();
                }
            }
        }
        catch (error) {
            console.error(error);
        }
        return null;
    });
}
function catchErrors(options, result) {
    const errors = Object.assign({ 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable' }, options.errors);
    const error = errors[result.status];
    if (error) {
        throw new ApiError_1.ApiError(result, error);
    }
    if (!result.ok) {
        throw new ApiError_1.ApiError(result, 'Generic Error');
    }
}
/**
 * Request using fetch client
 * @param options The request options from the the service
 * @returns ApiResult
 * @throws ApiError
 */
function request(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = getUrl(options);
        const response = yield sendRequest(options, url);
        const responseBody = yield getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        const result = {
            url,
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            body: responseHeader || responseBody,
        };
        catchErrors(options, result);
        return result;
    });
}
exports.request = request;

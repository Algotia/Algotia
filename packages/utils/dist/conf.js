"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const conf_1 = __importDefault(require("conf"));
exports.config = new conf_1.default({
    projectSuffix: "",
    schema: {
        appDir: {
            type: "string",
        },
        server: {
            type: "object",
            properties: {
                port: {
                    type: "number",
                    minimum: 1,
                    maximum: 65535,
                },
            },
        },
    },
    defaults: {
        appDir: undefined,
        server: {
            port: 2008,
        },
    },
});

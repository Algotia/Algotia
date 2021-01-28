"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const tsoa_1 = require("tsoa");
const cors_1 = __importDefault(require("cors"));
exports.app = express_1.default();
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
//TODO: whitelist docs domain etc
exports.app.use(cors_1.default());
exports.app.use(body_parser_1.default.json());
require("../dist/routes").RegisterRoutes(exports.app);
exports.app.use(function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof tsoa_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err === null || err === void 0 ? void 0 : err.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    next();
});
//# sourceMappingURL=app.js.map
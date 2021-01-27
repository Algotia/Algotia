"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExchangeID = void 0;
const exchange_1 = require("./exchange");
const isExchangeID = (id) => {
    return exchange_1.AllowedExchangeIDs.includes(id);
};
exports.isExchangeID = isExchangeID;
//# sourceMappingURL=guards.js.map
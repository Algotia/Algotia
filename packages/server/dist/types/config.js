"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidationError = void 0;
class ConfigValidationError extends Error {
    constructor(error) {
        super("Error validating configuration");
        this.errors = Array.isArray(error) ? error : [error];
    }
}
exports.ConfigValidationError = ConfigValidationError;
//# sourceMappingURL=config.js.map
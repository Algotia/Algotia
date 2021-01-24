"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigValidationError = exports.ConfigError = void 0;
class ConfigError extends Error {
    constructor(args) {
        const { message, path } = args;
        super(message);
        this.path = path;
    }
}
exports.ConfigError = ConfigError;
class ConfigValidationError extends Error {
    constructor(error) {
        super("Error validating configuration file");
        if (Array.isArray(error)) {
            this.errors = error;
        }
        else {
            this.errors = [error];
        }
    }
}
exports.ConfigValidationError = ConfigValidationError;
//# sourceMappingURL=config.js.map
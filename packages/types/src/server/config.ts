import { ValidationError } from "joi";

export interface ConfigOptions {
    port: number;
	strategyDir?: string;
}

interface ConfigErrorArgs {
    message: string;
    path: string;
}

export class ConfigError extends Error {
    path: string;
    constructor(args: ConfigErrorArgs) {
        const { message, path } = args;
        super(message);
        this.path = path;
    }
}

export class ConfigValidationError extends Error {
    errors: ValidationError[];
    constructor(error: ValidationError | ValidationError[]) {
        super("Error validating configuration file");
        if (Array.isArray(error)) {
            this.errors = error;
        } else {
            this.errors = [error];
        }
    }
}

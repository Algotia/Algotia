import { ValidationError } from "joi";
export interface ConfigOptions {
    port: number;
    appDir?: string;
}
interface ConfigErrorArgs {
    message: string;
    path: string;
}
export declare class ConfigError extends Error {
    path: string;
    constructor(args: ConfigErrorArgs);
}
export class ConfigValidationError extends Error {
    errors: ValidationError[];
    constructor(error: ValidationError | ValidationError[]) {
        super("Error validating configuration");
        this.errors = Array.isArray(error) ? error : [error];
    }
}

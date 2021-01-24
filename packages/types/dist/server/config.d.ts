import { ValidationError } from "joi";
export interface ConfigOptions {
    port: number;
    strategyDir?: string;
}
interface ConfigErrorArgs {
    message: string;
    path: string;
}
export declare class ConfigError extends Error {
    path: string;
    constructor(args: ConfigErrorArgs);
}
export declare class ConfigValidationError extends Error {
    errors: ValidationError[];
    constructor(error: ValidationError | ValidationError[]);
}
export {};

import type { ApiResult } from './ApiResult';
export declare class ApiError extends Error {
    readonly url: string;
    readonly status: number;
    readonly statusText: string;
    readonly body: any;
    constructor(response: ApiResult, message: string);
}
//# sourceMappingURL=ApiError.d.ts.map
declare type Resolver<T> = () => Promise<T>;
declare type Headers = Record<string, string>;
declare type Config = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
};
export declare const OpenAPI: Config;
export {};
//# sourceMappingURL=OpenAPI.d.ts.map
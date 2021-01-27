export interface DefaultOptions {
    pollingPeriodTable: typeof pollingPeriodTable;
}
export declare const pollingPeriodTable: {
    readonly "1m": "10s";
    readonly "3m": "1m";
    readonly "5m": "1m";
    readonly "15m": "1m";
    readonly "30m": "3m";
    readonly "1h": "3m";
    readonly "2h": "5m";
    readonly "4h": "5m";
    readonly "6h": "10m";
    readonly "8h": "10m";
    readonly "12h": "10m";
    readonly "1d": "30m";
    readonly "3d": "1h";
    readonly "1w": "2h";
    readonly "1M": "1d";
};
export declare const defaultOptions: DefaultOptions;

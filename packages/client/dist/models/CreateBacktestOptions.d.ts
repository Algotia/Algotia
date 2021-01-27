import type { ExchangeID } from './ExchangeID';
export declare type CreateBacktestOptions = {
    strategyPath: string;
    exchange: ExchangeID;
    period: string;
    pair: string;
    from: number;
    to: number;
    initialBalance: Record<string, number>;
};
//# sourceMappingURL=CreateBacktestOptions.d.ts.map
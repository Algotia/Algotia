import type { MinMax } from './MinMax';
export declare type Market = {
    id: string;
    symbol: string;
    base: string;
    quote: string;
    baseId: string;
    quoteId: string;
    type?: string;
    spot?: boolean;
    margin?: boolean;
    swap?: boolean;
    future?: boolean;
    active: boolean;
    precision: {
        price: number;
        amount: number;
        quote: number;
        base: number;
    };
    limits: {
        cost?: MinMax;
        price: MinMax;
        amount: MinMax;
    };
    tierBased: boolean;
    percentage: boolean;
    taker: number;
    maker: number;
    info: any;
};
//# sourceMappingURL=Market.d.ts.map
import type { Fee } from './Fee';
export declare type Trade = {
    amount: number;
    datetime: string;
    id: string;
    info: any;
    order?: string;
    price: number;
    timestamp: number;
    type?: string;
    side: 'buy' | 'sell';
    symbol: string;
    takerOrMaker: 'taker' | 'maker';
    cost: number;
    fee: Fee;
};
//# sourceMappingURL=Trade.d.ts.map
import type { Fee } from './Fee';
import type { Trade } from './Trade';
export declare type Order = {
    id: string;
    clientOrderId: string;
    datetime: string;
    timestamp: number;
    lastTradeTimestamp: number;
    status: 'open' | 'closed' | 'canceled';
    symbol: string;
    type: string;
    timeInForce?: string;
    side: 'buy' | 'sell';
    price: number;
    average?: number;
    amount: number;
    filled: number;
    remaining: number;
    cost: number;
    trades: Array<Trade>;
    fee: Fee;
    info: any;
};
//# sourceMappingURL=Order.d.ts.map
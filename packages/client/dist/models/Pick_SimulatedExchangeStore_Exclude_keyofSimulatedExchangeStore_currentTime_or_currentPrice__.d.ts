import type { Balances } from './Balances';
import type { Order } from './Order';
import type { StrategyError } from './StrategyError';
/**
 * From T, pick a set of properties whose keys are in the union K
 */
export declare type Pick_SimulatedExchangeStore_Exclude_keyofSimulatedExchangeStore_currentTime_or_currentPrice__ = {
    balance: Balances;
    openOrders: Array<Order>;
    closedOrders: Array<Order>;
    errors: Array<StrategyError>;
};
//# sourceMappingURL=Pick_SimulatedExchangeStore_Exclude_keyofSimulatedExchangeStore_currentTime_or_currentPrice__.d.ts.map
import { Trade, Order, Balance } from "@algotia/ccxt";
import { SimulatedExchangeStore, OHLCV_Candle } from "@algotia/types";
import { parsePair } from "../../../utils";
import Decimal from "decimal.js";

const createFillOrders = (
	store: SimulatedExchangeStore
): ((candle: OHLCV_Candle) => void) => {
	return (candle: OHLCV_Candle) => {
		for (const order of store.openOrders) {
			if (order.type === "market") {
				closeOrder(store, order);
			}

			if (order.type === "limit") {
				if (order.side === "buy") {
					if (order.price >= candle.low) {
						closeOrder(store, order);
					}
				} else if (order.side === "sell") {
					if (order.price <= candle.high) {
						closeOrder(store, order);
					}
				}
			}
		}
	};
};

const closeOrder = (store: SimulatedExchangeStore, order: Order): Order => {
	const index = store.openOrders.indexOf(order);

	const trade = createTrade(store, order);

	let closedOrder: Order = {
		...order,
		status: "closed",
		filled: order.amount,
		average: order.price,
		cost: new Decimal(order.price).mul(order.amount).toNumber(),
		remaining: 0,
		lastTradeTimestamp: trade.timestamp,
		trades: [trade],
	};

	store.openOrders.splice(index, 1);
	store.closedOrders.push(closedOrder);

	updateBalance(store, closedOrder);

	return closedOrder;
};

const createTrade = (store: SimulatedExchangeStore, order: Order): Trade => {
	const { currentTime } = store;

	const { id, symbol, side, amount, fee, price, type } = order;

	const trade: Omit<Trade, "info"> = {
		id,
		symbol,
		side,
		amount,
		type,
		fee,
		price,
		datetime: new Date(currentTime).toISOString(),
		timestamp: currentTime,
		cost: new Decimal(price).mul(amount).toNumber(),
		takerOrMaker: fee.type,
	};

	return {
		...trade,
		info: trade,
	};
};

interface BalanceArithmaticArgs {
	balance: Balance;
	amount: number;
}

type BalanceArithmaticFn = (args: BalanceArithmaticArgs) => Balance;

const subtractFee = (args: { balance: Balance; order: Order }): Balance => {
	const { order, balance } = args;
	const { cost } = order.fee;

	return {
		free: balance.free,
		used: new Decimal(balance.used).minus(cost).toNumber(),
		total: new Decimal(balance.total).minus(cost).toNumber(),
	};
};

const addBalance: BalanceArithmaticFn = (args) => {
	const { balance, amount } = args;
	return {
		free: new Decimal(balance.free).plus(amount).toNumber(),
		used: balance.used,
		total: new Decimal(balance.free).plus(amount).toNumber(),
	};
};

const subtractBalance: BalanceArithmaticFn = (args) => {
	const { balance, amount } = args;
	return {
		free: balance.free,
		used: new Decimal(balance.used).minus(amount).toNumber(),
		total: new Decimal(balance.total).minus(amount).toNumber(),
	};
};

const updateBalance = (store: SimulatedExchangeStore, closedOrder: Order) => {
	for (const trade of closedOrder.trades) {
		const [base, quote] = parsePair(trade.symbol);

		const baseBalance = store.balance[base];
		const quoteBalance = store.balance[quote];

		const quoteBalanceLessFees = subtractFee({
			balance: quoteBalance,
			order: closedOrder,
		});

		if (trade.side === "buy") {
			store.balance = Object.assign({}, store.balance, {
				[base]: addBalance({
					balance: baseBalance,
					amount: trade.amount,
				}),
				[quote]: subtractBalance({
					balance: quoteBalanceLessFees,
					amount: trade.cost,
				}),
			});
		}

		if (trade.side === "sell") {
			store.balance = Object.assign({}, store.balance, {
				[base]: subtractBalance({
					balance: baseBalance,
					amount: trade.amount,
				}),
				[quote]: addBalance({
					balance: quoteBalanceLessFees,
					amount: trade.cost,
				}),
			});
		}
	}
};

export default createFillOrders;

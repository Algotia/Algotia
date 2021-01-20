import { Trade, Order } from "ccxt";
import { SimulatedExchangeStore, OHLCV } from "../../types";
import { parsePair } from "../../utils";
import Decimal from "decimal.js";

const createFillOrders = (
	store: SimulatedExchangeStore
): ((candle: OHLCV) => void) => {
	return (candle: OHLCV) => {
		for (const order of store.openOrders) {
			if (order.type === "market") {
				closeOrder(store, order);
			} else if (order.type === "limit") {
				if (order.side === "buy") {
					if (order.price >= candle.low) {
						closeOrder(store, order);
					}
				}

				if (order.side === "sell") {
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
		cost: order.amount * order.price,
		remaining: 0,
		lastTradeTimestamp: trade.timestamp,
		trades: [trade],
	};

	closedOrder.info = { ...closedOrder };

	store.openOrders.splice(index, 1);
	store.closedOrders.push(closedOrder);

	updateBalance(store, closedOrder);

	return closedOrder;
};

const createTrade = (store: SimulatedExchangeStore, order: Order): Trade => {
	const { currentTime } = store;

	const datetime = new Date(currentTime).toISOString();
	const timestamp = currentTime;

	const { id, symbol, side, amount, fee, price, type } = order;

	const trade: Omit<Trade, "info"> = {
		id,
		symbol,
		side,
		amount,
		datetime,
		timestamp,
		type,
		fee,
		price,
		cost: new Decimal(price).mul(amount).toNumber(),
		takerOrMaker: fee.type,
	};

	return {
		...trade,
		info: trade,
	};
};

const updateBalance = (store: SimulatedExchangeStore, closedOrder: Order) => {
	for (const trade of closedOrder.trades) {
		const [base, quote] = parsePair(trade.symbol);

		const oldBaseBalance = store.balance[base];
		const oldQuoteBalance = store.balance[quote];

		if (trade.side === "buy") {
			const newBaseBalance = {
				free: new Decimal(oldBaseBalance.free)
					.plus(trade.amount)
					.toNumber(),
				used: oldBaseBalance.used,
				total: new Decimal(oldBaseBalance.total)
					.plus(trade.amount)
					.toNumber(),
			};

			const newQuoteBalance = {
				free: oldQuoteBalance.free,
				used: new Decimal(oldQuoteBalance.used)
					.minus(new Decimal(trade.cost).plus(trade.fee.cost))
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total)
					.minus(new Decimal(trade.cost).plus(trade.fee.cost))
					.toNumber(),
			};

			const newBalance = Object.assign({}, store.balance, {
				[base]: newBaseBalance,
				[quote]: newQuoteBalance,
			});

			newBalance.info = { ...newBalance };

			store.balance = newBalance;
		}

		if (trade.side === "sell") {
			const newBaseBalance = {
				free: oldBaseBalance.free,
				used: new Decimal(oldBaseBalance.used)
					.minus(trade.amount)
					.toNumber(),
				total: new Decimal(oldBaseBalance.total)
					.minus(trade.amount)
					.toNumber(),
			};

			const newQuoteBalance = {
				free: new Decimal(oldQuoteBalance.free)
					.plus(trade.cost)
					.toNumber(),
				used: new Decimal(oldQuoteBalance.used)
					.minus(trade.fee.cost)
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total)
					.plus(new Decimal(trade.cost).minus(trade.fee.cost))
					.toNumber(),
			};

			const newBalance = Object.assign({}, store.balance, {
				[base]: newBaseBalance,
				[quote]: newQuoteBalance,
			});

			newBalance.info = { ...newBalance };

			store.balance = newBalance;
		}
	}
};

export default createFillOrders;

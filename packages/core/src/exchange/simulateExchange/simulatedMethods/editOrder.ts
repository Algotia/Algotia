import { Exchange as CCXT_Exchange, Order } from "@algotia/ccxt";
import Decimal from "decimal.js";
import { Exchange, SimulatedExchangeStore } from "@algotia/types";
import { parsePair } from "../../../utils";

type EditOrder = CCXT_Exchange["editOrder"];
type Fees = Exchange["fees"];

const createEditOrder = (
	store: SimulatedExchangeStore,
	fees: Fees
): EditOrder => async (
	id: string,
	symbol: string,
	type: "market" | "limit",
	side: "buy" | "sell",
	amount: number,
	price?: number
): Promise<Order> => {
	const foundOrder = store.openOrders.find((order) => {
		return order.id === id;
	});

	if (!foundOrder) {
		const wasIdClosedOrder = store.closedOrders.find((order) => {
			return order.id === id;
		});
		if (wasIdClosedOrder) {
			throw new Error(
				`Error editing order: Order with ID ${id} is already closed.`
			);
		}
		throw new Error(
			`Error editing order: No order with id ${id} was found.`
		);
	}

	const { currentTime, balance } = store;

	const [base, quote] = parsePair(symbol);

	let decimalCost: Decimal;

	if (type === "limit") {
		if (!price) {
			throw new Error(
				"Error editing order: Order type is limit, but no price passed - order not edited"
			);
		}
		decimalCost = new Decimal(amount).mul(price);
	}

	if (type === "market") {
		price = store.currentPrice;
		decimalCost = new Decimal(amount).mul(price);
	}

	const makerFee = fees["trading"]["maker"];
	const takerFee = fees["trading"]["taker"];

	const prevDecimalFillCost = new Decimal(foundOrder.price).mul(
		foundOrder.amount
	);

	const fillCost = new Decimal(price).mul(amount);

	const editedOrder: Order = {
		...foundOrder,
		id,
		symbol,
		type,
		side,
		amount,
		price,
		datetime: new Date(currentTime).toISOString(),
		timestamp: currentTime,
		lastTradeTimestamp: null,
		status: "open",
		average: null,
		filled: 0,
		remaining: amount,
		cost: 0,
		trades: [],
		info: {},
		fee: {
			currency: quote,
			type: type === "market" ? "taker" : "maker",
			rate: type === "market" ? takerFee : makerFee,
			cost:
				type === "market"
					? new Decimal(takerFee).mul(fillCost).toNumber()
					: new Decimal(makerFee).mul(fillCost).toNumber(),
		},
	};

	const oldBaseBalance = store.balance[base];
	const oldQuoteBalance = store.balance[quote];

	if (side === "buy") {
		if (
			new Decimal(editedOrder.cost).gt(
				new Decimal(oldQuoteBalance.free)
					.minus(editedOrder.cost)
					.minus(foundOrder.cost)
			)
		) {
			throw new Error(
				`Error editing order: Insufficient balance - order not edited`
			);
		}
	} else if (side === "sell") {
		if (decimalCost.gt(balance[base].free)) {
			throw new Error(
				`Error editing order: Insufficient balance - order not edited`
			);
		}
	}

	if (side === "buy") {
		store.balance = Object.assign(store.balance, {
			[quote]: {
				free: new Decimal(oldQuoteBalance.free)
					.plus(prevDecimalFillCost)
					.minus(fillCost)
					.minus(editedOrder.fee.cost)
					.toNumber(),
				used: new Decimal(oldQuoteBalance.used)
					.minus(prevDecimalFillCost)
					.minus(foundOrder.fee.cost)
					.plus(fillCost)
					.plus(editedOrder.fee.cost)
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total)
					.minus(foundOrder.fee.cost)
					.toNumber(),
			},
		});
	}

	if (side === "sell") {
		store.balance = Object.assign(store.balance, {
			[base]: {
				free:
					oldBaseBalance.free -
					foundOrder.amount +
					editedOrder.amount,
				used:
					oldBaseBalance.used +
					-foundOrder.amount +
					editedOrder.amount,
				total: oldBaseBalance.total,
			},
			[quote]: {
				free: oldQuoteBalance.free - editedOrder.fee.cost,
				used: oldQuoteBalance.used + editedOrder.fee.cost,
				total: oldQuoteBalance.total - editedOrder.fee.cost,
			},
		});
	}

	const index = store.openOrders.indexOf(foundOrder);

	store.openOrders.splice(index, 1);
	store.openOrders.push(editedOrder);

	return editedOrder;
};

export default createEditOrder;

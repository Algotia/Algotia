import { Exchange as CCXT_Exchange, Params, Order } from "@algotia/ccxt";
import { SimulatedExchangeStore } from "@algotia/types";
import { parsePair } from "../../../utils";
import Decimal from "decimal.js";

type CancelOrder = CCXT_Exchange["cancelOrder"];

const createCancelOrder = (store: SimulatedExchangeStore): CancelOrder => {
	return async (
		id: string,
		_symbol?: string,
		_params?: Params
	): Promise<Order> => {
		const order = store.openOrders.find((order) => {
			return order.id === id;
		});

		if (!order) {
			throw new Error(`No order with ID ${id} was found`);
		}

		const { side, amount, price, symbol: pair, fee } = order;

		const [base, quote] = parsePair(pair);

		const oldQuoteBalance = store.balance[quote];
		const oldBaseBalance = store.balance[base];

		const filledCost = new Decimal(price).mul(amount);

		if (side === "buy") {
			store.balance[quote] = {
				free: new Decimal(oldQuoteBalance.free)
					.plus(filledCost)
					.toNumber(),
				used: new Decimal(oldQuoteBalance.used)
					.minus(filledCost)
					.minus(fee.cost)
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total)
					.minus(fee.cost)
					.toNumber(),
			};
		}

		if (side === "sell") {
			store.balance[base] = {
				free: new Decimal(oldBaseBalance.free).plus(amount).toNumber(),
				used: new Decimal(oldQuoteBalance.used)
					.minus(amount)
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total).toNumber(),
			};
			store.balance[quote] = {
				free: new Decimal(oldQuoteBalance.free).toNumber(),
				used: new Decimal(oldQuoteBalance.used)
					.minus(fee.cost)
					.toNumber(),
				total: new Decimal(oldQuoteBalance.total)
					.minus(fee.cost)
					.toNumber(),
			};
		}

		const index = store.openOrders.indexOf(order);

		store.openOrders.splice(index, 1);

		const closedOrder: Order = {
			...order,
			status: "canceled",
		};

		store.closedOrders.push(closedOrder);

		return closedOrder;
	};
};

export default createCancelOrder;

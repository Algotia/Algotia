import { BadRequest, BadSymbol, InsufficientFunds, Order } from "ccxt";
import { Exchange, SimulatedExchangeStore } from "../../types";
import { parsePair, uuid } from "../../utils";
import Decimal from "decimal.js";

type CreateOrder = Exchange["createOrder"];
type Fees = Exchange["fees"];

const createCreateOrder = (
	store: SimulatedExchangeStore,
	fees: Fees,
	derivesFrom?: Exchange
): CreateOrder => {
	return async (
		symbol: string,
		type: string,
		side: "buy" | "sell",
		amount: number,
		price?: number
	): Promise<Order> => {
		const decimalAmount = new Decimal(amount);
		let decimalPrice: Decimal;

		const { currentTime, balance } = store;

		const makerFee = new Decimal(fees["trading"]["maker"]);
		const takerFee = new Decimal(fees["trading"]["taker"]);

		const [base, quote] = parsePair(symbol);

		if (derivesFrom && derivesFrom.symbols) {
			if (!derivesFrom.symbols.includes(symbol)) {
				throw new BadSymbol(
					`Symbol ${symbol} does not exist on exchange ${derivesFrom.id}`
				);
			}
		} else {
			const balanceKeys = Object.keys(balance).filter(
				(key) => key !== "info" && key
			);

			if (!balanceKeys.includes(base)) {
				throw new BadSymbol(
					`No balance initialized for currency ${base}`
				);
			}

			if (!balanceKeys.includes(quote)) {
				throw new BadSymbol(
					`No balance initialized for currency ${quote}`
				);
			}
		}

		if (type === "limit") {
			if (!price) {
				throw new BadRequest(
					"Order type is limit, but no price passed"
				);
			}
			decimalPrice = new Decimal(price);
		}

		if (type === "market") {
			decimalPrice = new Decimal(store.currentPrice);
		}

		const costNoFee = new Decimal(decimalPrice.mul(decimalAmount));
		const feeCost = costNoFee.mul(type === "market" ? takerFee : makerFee);
		const costWithFees = costNoFee.plus(feeCost);

		const freeQuoteBalance = new Decimal(balance[quote].free);
		const freeBaseBalance = new Decimal(balance[base].free);

		const insufficientFundsMessage = `Insufficient balance for ${type} ${side} order costing ${
			side === "buy" ? costWithFees : amount
		} ${side === "buy" ? base : quote}`;

		if (side === "buy") {
			if (costNoFee.gt(freeQuoteBalance)) {
				throw new InsufficientFunds(insufficientFundsMessage);
			}
			if (costWithFees.gt(freeQuoteBalance)) {
				throw new InsufficientFunds(
					`Insufficient balance for paying fees costing ${feeCost} ${quote}`
				);
			}
		} else if (side === "sell") {
			if (decimalAmount.gt(freeBaseBalance)) {
				throw new InsufficientFunds(insufficientFundsMessage);
			}
			if (feeCost.gt(freeQuoteBalance)) {
				throw new InsufficientFunds(
					`Insufficient balance for paying fees costing ${feeCost} ${quote}`
				);
			}
		}

		const order: Order = {
			clientOrderId: undefined,
			id: uuid(),
			symbol,
			type,
			side,
			amount: decimalAmount.toNumber(),
			price: decimalPrice.toNumber(),
			cost: 0,
			datetime: new Date(currentTime).toISOString(),
			timestamp: currentTime,
			lastTradeTimestamp: null,
			status: "open",
			average: null,
			filled: 0,
			remaining: amount,
			trades: [],
			info: {},
			fee: {
				currency: quote,
				type: type === "market" ? "taker" : "maker",
				rate:
					type === "market"
						? takerFee.toNumber()
						: makerFee.toNumber(),
				cost: feeCost.toNumber(),
			},
		};

		const oldBaseBalance = store.balance[base];
		const oldQuoteBalance = store.balance[quote];

		if (side === "buy") {
			store.balance = Object.assign(store.balance, {
				[quote]: {
					free: new Decimal(oldQuoteBalance.free)
						.minus(costWithFees)
						.toNumber(),

					used: new Decimal(oldQuoteBalance.used)
						.plus(costWithFees)
						.toNumber(),
					total: new Decimal(oldQuoteBalance.total).toNumber(),
				},
			});
			store.balance.info = { ...store.balance };
			delete store.balance.info.info;
		}

		if (side === "sell") {
			store.balance = Object.assign(store.balance, {
				[base]: {
					free: new Decimal(oldBaseBalance.free)
						.minus(decimalAmount)
						.toNumber(),
					used: new Decimal(oldBaseBalance.used)
						.plus(decimalAmount)
						.toNumber(),
					total: new Decimal(oldBaseBalance.total).toNumber(),
				},
				[quote]: {
					free: new Decimal(oldQuoteBalance.free)
						.minus(feeCost)
						.toNumber(),
					used: new Decimal(oldQuoteBalance.used)
						.plus(feeCost)
						.toNumber(),
					total: new Decimal(oldQuoteBalance.total).toNumber(),
				},
			});
			store.balance.info = { ...store.balance };
			delete store.balance.info.info;
		}

		store.openOrders.push(order);

		return order;
	};
};

export default createCreateOrder;

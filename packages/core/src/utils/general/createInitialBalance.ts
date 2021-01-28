import { InitialBalance, SimulatedExchangeStore } from "../../types";

const createInitialBalance = (
	initialBalance: InitialBalance
): SimulatedExchangeStore["balance"] => {
	let balance: SimulatedExchangeStore["balance"];
	const keys = Object.keys(initialBalance);

	for (const currency of keys) {
		balance = Object.assign({}, balance, {
			[currency]: {
				free: initialBalance[currency],
				used: 0,
				total: initialBalance[currency],
			},
		});
	}

	return balance;
};

export default createInitialBalance;

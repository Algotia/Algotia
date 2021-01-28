import { ExchangeID } from "@algotia/core";
import { Router } from "express";
import { validateImperatively } from "../../../utils";
import { postBacktest, validatePostBacktest } from "./post";

export const backtestRoute = (router: Router) => {
    /**
     * @swagger
     *
     * /backtest:
     *   post:
     *     requestBody:
     *       description: Optional description in *Markdown*
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            - name: exchangeId
     *         required: true
	 *         schema:
     *           type: string
     *           enum: [binance, kucoin, bitfinex]
     *       - name: to
     *         in: body
     *         required: true
	 *         schema: 
     *           type: integer
	 *           format: int32
     *       - name: from
     *         in: body
     *         required: true
	 *         schema: 
     *           type: integer
	 *           format: int32
     */
    router
        .route("/backtest")
        .post(validateImperatively(validatePostBacktest), postBacktest);
};

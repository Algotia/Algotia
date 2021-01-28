import { Exchange, ExchangeID } from "@algotia/core";
import node_path from "path";
import { request } from "../test-utils";

jest.mock("@algotia/core", () => {
    const algotia = jest.requireActual("@algotia/core");

    return {
        __esModule: true, // Use it when dealing with esModules
        ...algotia,
        createExchange: jest
            .fn()
            .mockImplementation((exchangeId: ExchangeID) => {
                let exchange: any = {};
                let anyObj: any = {};
                const markets = {
                    "ETH/BTC": anyObj,
                    "BTC/ETH": anyObj,
                };
                exchange.loadMarkets = async () => {
                    return markets;
                };
                exchange.markets = markets;
                exchange.symbols = Object.keys(markets);
                exchange.timeframes = { "1h": "1h" };
                //@ts-ignore
                exchange.currencies = {
                    ETH: {},
                    BTC: {},
                };
                return exchange;
            }),
        backfill: jest.fn().mockReturnValue(
            new Promise((resolve) => {
                let candles = [];
                for (let i = 0; i < 100; i++) {
                    candles.push({
                        timestamp: i,
                        open: 1,
                        high: 1,
                        low: 1,
                        close: 1,
                        volume: 1,
                    });
                }
                resolve(candles);
            })
        ),
    };
});

describe("POST backtest", () => {
    it("should fail validation", async () => {
        const reqBodies = [
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "foo",
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        ETH: 100,
                        BTC: 100,
                    },
                },
                "exchange",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "foo/bar",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        ETH: 100,
                        BTC: 100,
                    },
                },
                "pair",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "ETH/BTC",
                    period: "foo",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        ETH: 100,
                        BTC: 100,
                    },
                },
                "period",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: "./__fixtures__/strategy.js",
                    initialBalance: {
                        ETH: 100,
                        BTC: 100,
                    },
                },
                "strategyPath",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        ETH: 100,
                        BTC: 100,
                    },
                },
                "exchange",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        foo: 100,
                        bar: 100,
                    },
                },
                "initialBalance",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                    initialBalance: {
                        ETH: "foo",
                        BTC: "bar",
                    },
                },
                "initialBalance",
            ],
            [
                {
                    to: 1606867200000,
                    from: 1606780800000,
                    exchange: "binance",
                    pair: "ETH/BTC",
                    period: "1h",
                    strategyPath: node_path.join(
                        __dirname,
                        "./__fixtures__/strategy.js"
                    ),
                },
                "initialBalance",
            ],
        ];

        for (const [body, param] of reqBodies) {
            const res = await request()
                .post("/api/backtest")
                .set("Accept", "application/json")
                .send(body);
            expect(res.status).toStrictEqual(400);
            expect(Array.isArray(res.body.errors)).toStrictEqual(true);
            expect(res.body.errors[0].param).toStrictEqual(param);
        }
    });
    test("returns backtest results and candles", async () => {
        const res = await request()
            .post("/api/backtest")
            .set("Accept", "application/json")
            .send({
                exchange: "binance",
                to: 1606867200000,
                from: 1606780800000,
                pair: "ETH/BTC",
                period: "1h",
                strategyPath: node_path.join(
                    __dirname,
                    "./__fixtures__/strategy.js"
                ),
                initialBalance: {
                    ETH: 100,
                    BTC: 100,
                },
            });

        expect(res.body.candles).toBeTruthy();
        expect(Array.isArray(res.body.candles)).toStrictEqual(true);

        expect(res.body.results).toBeTruthy();
        expect(res.body.results.balance).toBeTruthy();
        expect(res.body.results.closedOrders).toBeDefined();
        expect(res.body.results.openOrders).toBeDefined();
        expect(res.body.results.errors).toBeDefined();
    });
});

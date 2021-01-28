import { CreateBacktestOptions, ExchangeID } from "@algotia/client";
import node_path from "path";
import { client } from "../test-utils";

jest.mock("@algotia/core", () => {
    const algotia = jest.requireActual("@algotia/core");

    return {
        __esModule: true, // Use it when dealing with esModules ...algotia,
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

const validBody: CreateBacktestOptions = {
    to: 1606867200000,
    from: 1606780800000,
    exchange: "binance" as ExchangeID,
    pair: "ETH/BTC",
    period: "1h",
    strategyPath: node_path.join(__dirname, "./__fixtures__/strategy.js"),
    initialBalance: {
        ETH: 100,
        BTC: 100,
    } as const,
};

const reqBodies: [CreateBacktestOptions, string][] = [
    [Object.assign(validBody, { exchange: "foo" }), "exchange"],
    [Object.assign(validBody, { exchange: undefined }), "exchange"],
    [Object.assign(validBody, { pair: "foo/bar" }), "pair"],
    [Object.assign(validBody, { period: "foo" }), "period"],
    [Object.assign({ strategyPath: "foo" }), "strategyPath"],
    [
        Object.assign(validBody, {
            initialBalance: { foo: 1, bar: 1 },
        }),
        "initialBalance",
    ],
    [
        Object.assign(validBody, {
            initialBalance: {
                ETH: "foo",
                BTC: "bar",
            },
        }),
        "initialBalance",
    ],
    [
        Object.assign(validBody, {
            initialBalance: undefined,
        }),
        "initialBalance",
    ],
];
describe("POST backtest", () => {
    it("should fail validation", async () => {
        for (const [body, param] of reqBodies) {
            expect(client.createBacktest(body)).rejects.toThrowError();
        }
    });
    test("returns backtest results and candles", async () => {
        try {
            const res = await client.createBacktest({
                ...validBody,
                exchange: "binance" as ExchangeID,
                initialBalance: {
                    ETH: 100,
                    BTC: 100,
                },
            });

            expect(Array.isArray(res.data.candles)).toStrictEqual(true);
            expect(res.data.results).toBeTruthy();
            expect(res.data.results.balance).toBeTruthy();
            expect(res.data.results.closedOrders).toBeDefined();
            expect(res.data.results.openOrders).toBeDefined();
            expect(res.data.results.errors).toBeDefined();
        } catch (err) {
            console.log(err.response.data);
        }
    });
});

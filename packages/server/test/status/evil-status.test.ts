import { AllowedExchangeIDs, ExchangeID } from "@algotia/core";
import { request } from "../test-utils";

jest.mock("@algotia/core", () => {
    const algotia = jest.requireActual("@algotia/core");

    return {
        __esModule: true, // Use it when dealing with esModules
        ...algotia,
        createExchange: (exchangeId: ExchangeID) => {
            const exchange = algotia.createExchange(exchangeId);
            return {
                ...exchange,
                fetchStatus: jest.fn().mockImplementation(async () => {
                    return { status: "down" };
                }),
            };
        },
    };
});

describe("status route", () => {
    test("GET should return exchange status", async () => {
        const res = await request().get("/api/status").expect(200);

        for (const exchangeId of AllowedExchangeIDs) {
            expect(res.body["exchanges"]).toHaveProperty(exchangeId);
            expect(res.body["exchanges"][exchangeId]).toStrictEqual(false);
        }
    });
});

import Gateway from "/api/Gateway.js";

describe("Gateway", () => {

    let gateway = new Gateway({
        apiToken: localStorage.apiToken
    });

    describe("#get()", () => {

        it("resolves to a json", async () => {
            expect(
                await gateway.get("/v1/market/number-of-files:themeforest.json")
            ).toEqual({
                "number-of-files": jasmine.any(Array)
            });
        });
    });

    describe("#getItem()", () => {

        it("resolves to an item", async () => {
            let itemId = 2833226;
            expect(
                await gateway.getItem(itemId)
            ).toEqual(
                jasmine.objectContaining({
                    id: itemId,
                    last_week_sales: jasmine.any(Number),
                    last_three_months_sales: jasmine.any(Number),
                    exclusive: jasmine.any(Boolean)
                })
            );
        });
    });
});

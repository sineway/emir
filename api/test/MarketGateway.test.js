import MarketGateway from "/api/MarketGateway.js";

xdescribe("MarketGateway", () => {

    let gateway = new MarketGateway({
        apiToken: localStorage.apiToken
    });

    describe("#getPopular()", () => {

        it("resolves to a popular items/authors data", async () => {
            expect(
                await gateway.getPopular("themeforest")
            ).toEqual({
                items_last_week: jasmine.any(Array),
                items_last_three_months: jasmine.any(Array),
                authors_last_month: jasmine.any(Array)
            });
        });
    });

    describe("#getUserBadges()", () => {

        it("resolves to a list of user badges", async () => {
            expect(
                await gateway.getUserBadges("ThemeFusion")
            ).toEqual(
                jasmine.any(Array)
            );
        });
    });

    describe("#getCatalogItem()", () => {

        it("resolves to a catalog item", async () => {
            let itemId = 2833226;
            expect(
                await gateway.getCatalogItem(itemId)
            ).toEqual(
                jasmine.objectContaining({
                    id: itemId,
                    last_week: jasmine.any(Object),
                    last_three_months: jasmine.any(Object),
                    author_badges: jasmine.any(Array)
                })
            );
        });
    });
});

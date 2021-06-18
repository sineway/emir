import ItemEstimate from "/api/ItemEstimate.js";
import TimeUnit from "/api/TimeUnit.js";

describe("ItemEstimate", () => {

    let estimate;

    beforeEach(() => {
        estimate = new ItemEstimate({
            site: "photodune",
            category: "misc",
            listPrice: 2,
            sales: 24,
            age: TimeUnit.DAY,
            exclusive: true,
            authorLevel: 0
        });
    });

    describe("#withTaxRate()", () => {

        it("updates tax, author fee, and profit", () => {
            expect(
                estimate.withTaxRate(1)
            ).toEqual(
                jasmine.objectContaining({
                    tax: 1,
                    authorFee: 0,
                    profit: 0
                })
            );
        });
    });

    describe("#salesFor()", () => {

        it("returns number of sales for a certain period of time", () => {
            expect(
                estimate.salesFor(TimeUnit.HOUR)
            ).toBe(
                1
            );
        });
    });

    describe("#revenueFor()", () => {

        it("returns revenue for a certain period of time", () => {
            expect(
                estimate.revenueFor(TimeUnit.HOUR)
            ).toBe(
                2
            );
        });
    });

    describe("#profitFor()", () => {

        it("returns profit for a certain period of time", () => {
            expect(
                estimate.profitFor(TimeUnit.HOUR)
            ).toBe(
                .625
            );
        });
    });
});


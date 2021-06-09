import TimeUnit from "./time-unit.js";
import {CalculableItem} from "./calculable-item.js";
import {PresentableItem} from "./presentable-item.js";

const item = new PresentableItem({
    price_cents: 200,
    site: "photodune",
    classification: "misc",
    published_at: new Date(Date.now() - TimeUnit.week).toJSON(),
    number_of_sales: 7,
    last_week: 7
});

describe("CalculableItem", () => {
    describe("#getSalesNumber()", () => {
        it("should get sales number", () => {
            [undefined, "last_week"].forEach((salesKey) => {
                item.getSalesNumber("day", salesKey).should.equal(1);
                item.getSalesNumber("week", salesKey).should.equal(7);
                item.getSalesNumber("month", salesKey).should.equal(30);
            });
        });
    });
});

describe("PresentableItem", () => {
    describe("#getRevenue()", () => {
        it("should get formatted revenue", () => {
            [undefined, "last_week"].forEach((by) => {
                item.getRevenue({per: "day", by}).should.equal("$2.00");
                item.getRevenue({per: "week", by}).should.equal("$14.00");
                item.getRevenue({per: "month", by}).should.equal("$60.00");
            });
        });
    });

    describe("#getBuyerFee()", () => {
        it("should get formatted buyer fee", () => {
            item.getBuyerFee().should.equal("$1.00");
        });
    });

    describe("#getAuthorFee()", () => {
        it("should get formatted author fee", () => {
            item.getAuthorFee().should.equal("$0.55");
        });
    });

    describe("#getProfit()", () => {
        it("should get formatted profit", () => {
            [undefined, "last_week"].forEach((by) => {
                item.getProfit({per: "day", by}).should.equal("$0.45");
            });
        });
    });
});
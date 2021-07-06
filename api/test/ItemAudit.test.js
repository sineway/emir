import ItemAudit from "/api/ItemAudit.js"
import TimeUnit from "/api/TimeUnit.js"

describe("ItemAudit", () => {

    let audit

    beforeEach(() => {
        audit = new ItemAudit({
            period: TimeUnit.DAY,
            sales: 24,
            listPrice: 2,
            buyerFee: 1,
            authorFeeRate: .5,
            taxRate: 0
        })
    })

    describe("#taxRate", () => {

        it("updates tax, author fee, and earnings", () => {
            expect(
                Object.assign(audit, { taxRate: 1 })
            ).toEqual(
                jasmine.objectContaining({
                    tax: 1,
                    authorFee: 0,
                    earnings: 0
                })
            )
        })
    })

    describe("#salesFor()", () => {

        it("returns number of sales for a certain period of time", () => {
            expect(
                audit.salesFor(TimeUnit.HOUR)
            ).toBe(
                1
            )
        })
    })

    describe("#revenueFor()", () => {

        it("returns revenue for a certain period of time", () => {
            expect(
                audit.revenueFor(TimeUnit.HOUR)
            ).toBe(
                2
            )
        })
    })

    describe("#earningsFor()", () => {

        it("returns earnings for a certain period of time", () => {
            expect(
                audit.earningsFor(TimeUnit.HOUR)
            ).toBe(
                .5
            )
        })
    })
})


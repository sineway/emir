import EarningsCalculator from "/api/EarningsCalculator.js"
import TimeUnit from "/api/TimeUnit.js"

describe("EarningsCalculator", () => {

    let calc

    beforeEach(() => {
        calc = new EarningsCalculator({
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
                Object.assign(calc, { taxRate: 1 })
            ).toEqual(
                jasmine.objectContaining({
                    tax: 1,
                    authorFee: 0,
                    earnings: 0
                })
            )
        })
    })

    describe("#salesPer()", () => {

        it("returns number of sales for a certain period of time", () => {
            expect(
                calc.salesPer(TimeUnit.HOUR)
            ).toBe(
                1
            )
        })
    })

    describe("#revenuePer()", () => {

        it("returns revenue for a certain period of time", () => {
            expect(
                calc.revenuePer(TimeUnit.HOUR)
            ).toBe(
                2
            )
        })
    })

    describe("#earningsPer()", () => {

        it("returns earnings for a certain period of time", () => {
            expect(
                calc.earningsPer(TimeUnit.HOUR)
            ).toBe(
                .5
            )
        })
    })
})


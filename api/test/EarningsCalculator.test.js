import EarningsCalculator from '/api/EarningsCalculator.js';
import TimeUnit from '/api/TimeUnit.js';

describe('EarningsCalculator', () => {
    let calc;
    beforeEach(() => {
        calc = new EarningsCalculator({
            period: TimeUnit.DAY,
            sales: 24,
            listPrice: 2,
            buyerFee: 1,
            authorFeeRate: 0.5,
            usTaxRate: 0,
            usBuyersRatio: 1,
        });
    });
    describe('#usTaxRate', () => {
        it('updates US tax, author fee, and earnings', () => {
            expect(Object.assign(calc, {usTaxRate: 1})).toEqual(
                jasmine.objectContaining({
                    usTax: 1,
                    authorFee: 0,
                    earnings: 0,
                })
            );
        });
    });
    describe('#salesFor()', () => {
        it('returns number of sales for a certain period of time', () => {
            expect(calc.salesFor(TimeUnit.HOUR)).toBe(1);
        });
    });
    describe('#revenueFor()', () => {
        it('returns revenue for a certain period of time', () => {
            expect(calc.revenueFor(TimeUnit.HOUR)).toBe(2);
        });
    });
    describe('#earningsFor()', () => {
        it('returns earnings for a certain period of time', () => {
            expect(calc.earningsFor(TimeUnit.HOUR)).toBe(0.5);
        });
    });
});

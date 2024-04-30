import TimeUnit from '/api/TimeUnit.js';

describe('TimeUnit', () => {
    it('has static fields', () => {
        expect(Object.entries(TimeUnit)).toEqual([
            ['SECOND', 1_000],
            ['MINUTE', 60_000],
            ['HOUR', 3_600_000],
            ['DAY', 86_400_000],
            ['WEEK', 604_800_000],
            ['MONTH', 2_592_000_000],
            ['YEAR', 31_536_000_000],
        ]);
    });
    describe('measure()', () => {
        it('returns a time unit identifier for a value', () => {
            expect(TimeUnit.measure(24 * TimeUnit.HOUR)).toBe('DAY');
        });
        it('returns a time unit identifier for a negative value', () => {
            expect(TimeUnit.measure(-24 * TimeUnit.HOUR)).toBe('DAY');
        });
    });
});

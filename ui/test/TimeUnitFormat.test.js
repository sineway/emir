import TimeUnitFormat from "/ui/TimeUnitFormat.js";
import TimeUnit from "/api/TimeUnit.js";

describe("TimeUnitFormat", () => {

    let instance;

    beforeEach(() => {
        instance = new TimeUnitFormat({ locale: "en" });
    });

    describe("#format()", () => {

        it("returns a string representing a time unit", () => {
            expect(
                instance.format(TimeUnit.DAY)
            ).toBe(
                "1 day"
            );
        });
    });
});

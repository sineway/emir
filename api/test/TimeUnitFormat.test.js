import TimeUnitFormat from "/api/TimeUnitFormat.js"
import TimeUnit from "/api/TimeUnit.js"

describe("TimeUnitFormat", () => {

	let instance

	beforeEach(() => {
		instance = new TimeUnitFormat({ locale: "en" })
	})

	describe("#format()", () => {

		it("returns a string representing a time unit", () => {
			expect(
				instance.format(1.5 * TimeUnit.DAY)
			).toBe(
				"2 days"
			)
		})
	})
})

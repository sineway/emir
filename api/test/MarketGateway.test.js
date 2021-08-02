import MarketGateway from "/api/MarketGateway.js"

describe("MarketGateway", () => {

	let pattern = /^\w{32}$/
	if (!pattern.test(localStorage.apiToken)) {
		localStorage.apiToken = prompt("API token")
	}
	let gateway = new MarketGateway
	gateway.apiToken = localStorage.apiToken

	describe("#getPopular()", () => {

		it("resolves to a popular files for a particular site", async () => {
			expect(
				await gateway.getPopular("themeforest")
			).toEqual(
				jasmine.objectContaining({
					popular: jasmine.any(Object)
				})
			)
		})
	})

	describe("#getUser()", () => {

		it("resolves to a user account details", async () => {
			expect(
				await gateway.getUser("ThemeFusion")
			).toEqual(
				jasmine.objectContaining({
					user: jasmine.any(Object)
				})
			)
		})
	})

	describe("#getUserBadges()", () => {

		it("resolves to a list of badges for a given user", async () => {
			expect(
				await gateway.getUserBadges("ThemeFusion")
			).toEqual(
				jasmine.objectContaining({
				   "user-badges": jasmine.any(Array)
				})
			)
		})
	})

	describe("#getCatalogItem()", () => {

		it("resolves to all details of a particular item on Envato Market", async () => {
			let itemId = 2833226
			expect(
				await gateway.getCatalogItem(itemId)
			).toEqual(
				jasmine.objectContaining({
					id: itemId
				})
			)
		})
	})

	describe("#getTotalItems()", () => {

		it("resolves to a total number of items available on Envato Market", async () => {
			expect(
				await gateway.getTotalItems()
			).toEqual(
				jasmine.objectContaining({
				   "total-items": jasmine.any(Object)
				})
			)
		})
	})
})

import authorLevels from "/api/resources/author-levels.js"
import authorFees from "/api/resources/author-fees.js"
import buyerFees from "/api/resources/buyer-fees.js"
import usTaxTreaties from "/api/resources/us-tax-treaties.js"
/**
	@class MarketParser
*/
export class MarketParser {
	/**
		@param {Object} json
		@returns {Object}
	*/
	parseCatalogItem(json) {
		let [siteName] = json.site.split(".")
		let [categoryName] = json.classification.split("/")
		return {
			period: Date.now() - Date.parse(json.published_at),
			sales: json.number_of_sales,
			listPrice: json.price_cents / 100,
			buyerFee: buyerFees[`${ siteName }/${ categoryName }`]
		}
	}
	/**
		@param {Object} json
		@param {Number} itemId
		@returns {Object}
	*/
	parsePopular(json, itemId) {
		let { popular } = json
		let week = popular.items_last_week.find(item => item.id == itemId)
		let quarter = popular.items_last_three_months.find(item => item.id == itemId)
		return {
			salesForWeek: week && Number(week.sales),
			salesForQuarter: quarter && Number(quarter.sales)
		}
	}
	/**
		@param {Object} json
		@returns {Object}
	*/
	parseUser(json) {
		let { country } = json.user
		let usTax
		if (country == "United States") {
			usTax = 0
		} else if (country in usTaxTreaties) {
			usTax = usTaxTreaties[country]
		} else {
			usTax = 30
		}
		return {
			usTaxRate: usTax / 100
		}
	}
	/**
		@param {Object} json
		@returns {Object}
	*/
	parseUserBadges(json) {
		let badges = json["user-badges"]
		let levelBadge = badges.find(badge => badge.name.startsWith("author_level"))
		let level = Number(levelBadge?.name.split("_").pop() ?? "")
		let percent = authorFees.nonExclusivePercent
		let exclusive = badges.some(badge => badge.name == "exclusive")
		if (exclusive) {
			let nextLevel = Math.min(level + 1, authorLevels.length)
			let maxAmount = authorLevels.find(item => {
				return item.level == nextLevel
			}).amount - 1
			percent = authorFees.exclusive.find((item, index, list) => {
				let next = list[index + 1]
				return next == null || next.amount > maxAmount
			}).percent
		}
		return {
			authorFeeRate: percent / 100
		}
	}
}
export default MarketParser



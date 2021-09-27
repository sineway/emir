import MarketGateway from "./MarketGateway.js"
import MarketParser from "./MarketParser.js"
import TimeUnit from "./TimeUnit.js"
import EarningsCalculator from "./EarningsCalculator.js"
/**
	@class Market
*/
export class Market {
	/**
		@type {MarketGateway}
	*/
	gateway = new MarketGateway
	/**
		@type {MarketParser}
	*/
	parser = new MarketParser
	/**
		@param {Number} itemId
		@returns {Promise<ItemEstimate>}
	*/
	async estimateItem(itemId) {
		let item = await this.gateway.getCatalogItem(itemId)

		let [user, badges, popular] = await Promise.all([
			this.gateway.getUser(item.author_username),
			this.gateway.getUserBadges(item.author_username),
			this.gateway.getPopular(item.site.split(".").shift())
		])
		let dataForAllTime = Object.assign(
			this.parser.parseCatalogItem(item),
			this.parser.parseUser(user),
			this.parser.parseUserBadges(badges)
		)
		let parsedPopular = this.parser.parsePopular(popular, itemId)
		/**
			@typedef {ItemEstimate}
			@prop {String} name
			@prop {Array<EarningsCalculator>} records
		*/
		return {
			name: item.name,
			...user,
			...badges,
			records: [{
				...dataForAllTime,
				period: TimeUnit.WEEK,
				sales: parsedPopular.salesForWeek
			}, {
				...dataForAllTime,
				period: 3 * TimeUnit.MONTH,
				sales: parsedPopular.salesForQuarter
			},
				dataForAllTime
			]
			.filter(item => item.sales >= 0)
			.map(item => new EarningsCalculator(item))
		}
	}
}
export default Market

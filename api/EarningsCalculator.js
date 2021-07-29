/**
	@class EarningsCalculator
	@param {Object} properties
*/
export class EarningsCalculator {
	constructor(properties) {
		/**
			@type {Number}
		*/
		this.period = properties.period
		/**
			@type {Number}
		*/
		this.sales = properties.sales
		/**
			@type {Number}
		*/
		this.listPrice = properties.listPrice
		/**
			@type {Number}
		*/
		this.buyerFee = properties.buyerFee
		/**
			@type {Number}
		*/
		this.taxRate = properties.taxRate
		/**
			@type {Number}
		*/
		this.authorFeeRate = properties.authorFeeRate
	}
	/**
		@readonly
		@type {Number}
	*/
	get price() {
		return this.listPrice - this.buyerFee
	}
	/**
		@readonly
		@type {Number}
	*/
	get tax() {
		return this.price * this.taxRate
	}
	/**
		@readonly
		@type {Number}
	*/
	get authorFee() {
		return (this.price - this.tax) * this.authorFeeRate
	}
	/**
		@readonly
		@type {Number}
	*/
	get revenue() {
		return this.listPrice
	}
	/**
		@readonly
		@type {Number}
	*/
	get earnings() {
		return this.price - this.tax - this.authorFee
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	salesPer(period) {
		return this.sales / (this.period / period)
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	revenuePer(period) {
		return this.revenue * this.salesPer(period)
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	earningsPer(period) {
		return this.earnings * this.salesPer(period)
	}
}
export default EarningsCalculator

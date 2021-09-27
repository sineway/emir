/**
	@class EarningsCalculator
*/
export class EarningsCalculator {
	/**
		@type {Number}
	*/
	period
	/**
		@type {Number}
	*/
	sales
	/**
		@type {Number}
	*/
	listPrice
	/**
		@type {Number}
	*/
	buyerFee
	/**
		@type {Number}
	*/
	taxRate
	/**
		@type {Number}
	*/
	authorFeeRate
	/**
		@param {Object=} properties
	*/
	constructor(properties = {}) {
		Object.keys(this).forEach(name => {
			if (!properties.hasOwnProperty(name)) {
				throw new Error(`Missing property <${ name }>`)
			}
			this[name] = properties[name]
		})
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

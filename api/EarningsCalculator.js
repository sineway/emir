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
	usTaxRate
	/**
		@type {Number}
	*/
	usBuyersRatio
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
	get usTax() {
		return this.price * this.usTaxRate * this.usBuyersRatio
	}
	/**
		@readonly
		@type {Number}
	*/
	get authorFee() {
		return (this.price - this.usTax) * this.authorFeeRate
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
		return this.price - this.usTax - this.authorFee
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	salesFor(period) {
		return this.sales / (this.period / period)
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	revenueFor(period) {
		return this.revenue * this.salesFor(period)
	}
	/**
		@param {Number} period
		@returns {Number}
	*/
	earningsFor(period) {
		return this.earnings * this.salesFor(period)
	}
}
export default EarningsCalculator

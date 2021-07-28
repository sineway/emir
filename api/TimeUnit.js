/**
	@class TimeUnit
*/
export class TimeUnit {
	/**
		@type {Number}
	*/
	static SECOND = 1000
	/**
		@type {Number}
	*/
	static MINUTE = 60 * this.SECOND
	/**
		@type {Number}
	*/
	static HOUR = 60 * this.MINUTE
	/**
		@type {Number}
	*/
	static DAY = 24 * this.HOUR
	/**
		@type {Number}
	*/
	static WEEK = 7 * this.DAY
	/**
		@type {Number}
	*/
	static MONTH = 30 * this.DAY
	/**
		@type {Number}
	*/
	static YEAR = 365 * this.DAY
	/**
		@param {Number} value
		@returns {String}
	*/
	static measure(value) {
		let absoluteValue = Math.abs(value)
		return Object.keys(this).find((key, index, list) => {
			let nextKey = list[index + 1]
			return nextKey == null || this[nextKey] > absoluteValue
		})
	}
}
export default TimeUnit

import TimeUnit from "/api/TimeUnit.js"
/**
	@function
	@param {String} name
	@returns {(String|Array<String>)}
*/
export let msg = name => {
	let value = browser.i18n.getMessage(name)
	if (value.includes("\\")) {
		return value.split("\\").map(item => item.trim())
	}
	return value
}
/**
	@function
	@param {Number} value
	@returns {String}
*/
export let tmu = value => {
	let name = TimeUnit.measure(value)
	return (value / TimeUnit[name]).toLocaleString([], {
		style: "unit",
		unit: name.toLowerCase(),
		unitDisplay: "long",
		maximumFractionDigits: 0
	})
}
/**
	@function
	@param {Number} value
	@returns {String}
*/
export let num = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 2
}).format
/**
	@function
	@param {Number} value
	@returns {String}
*/
export let numCpt = new Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short"
}).format
/**
	@function
	@param {Number} value
	@returns {String}
*/
export let ccy = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
}).format
/**
	@function
	@param {Number} value
	@returns {String}
*/
export let pct = new Intl.NumberFormat("en-US", {
	style: "percent"
}).format

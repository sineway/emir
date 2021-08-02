import TimeUnitFormat from "/api/TimeUnitFormat.js"

let locale = "en-US"
/**
	@type {Intl.NumberFormat}
*/
export let compactNumber = new Intl.NumberFormat(locale, {
	notation: "compact",
	compactDisplay: "short"
})
/**
	@type {Intl.NumberFormat}
*/
export let number = new Intl.NumberFormat(locale, {
	maximumFractionDigits: 2
})
/**
	@type {Intl.NumberFormat}
*/
export let currency = new Intl.NumberFormat(locale, {
	style: "currency",
	currency: "USD"
})
/**
	@type {Intl.NumberFormat}
*/
export let percent = new Intl.NumberFormat(locale, {
	style: "percent"
})
/**
	@type {TimeUnitFormat}
*/
export let timeUnit = new TimeUnitFormat({
	style: "long"
})

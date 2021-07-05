import TimeUnitFormat from "/api/TimeUnitFormat.js";

let locale = "en-US";
/**
    @type {TimeUnitFormat}
*/
export let timeUnitFormat = new TimeUnitFormat({
    locale,
    style: "long"
});
/**
    @type {Intl.RelativeTimeFormat}
*/
export let relativeTimeFormat = new Intl.RelativeTimeFormat(locale, {
    style: "long",
    numeric: "always"
});
/**
    @type {Intl.NumberFormat}
*/
export let compactNumberFormat = new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short"
});
/**
    @type {Intl.NumberFormat}
*/
export let numberFormat = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 3
});
/**
    @type {Intl.NumberFormat}
*/
export let currencyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD"
});
/**
    @type {Intl.NumberFormat}
*/
export let percentFormat = new Intl.NumberFormat(locale, {
    style: "percent"
});

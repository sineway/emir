import TimeUnitFormat from "/ui/TimeUnitFormat.js";

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
export let quantityFormat = new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short"
});
/**
    @type {Intl.NumberFormat}
*/
export let currencyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
/**
    @type {Intl.NumberFormat}
*/
export let percentFormat = new Intl.NumberFormat(locale, {
    style: "percent"
});

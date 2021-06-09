import TimeUnit from "./time-unit.js";
import BuyerFee from "./buyer-fee.js";

export class CalculableItem {
    /*
        @argument {Object} data
    */
    constructor(data) {
        this.data = data;
    }
    /*
        @return {Number}
    */
    getPriceCents() {
        return this.data.price_cents;
    }
    /*
        @return {Number}
    */
    getBuyerFeeCents() {
        const {site, classification} = this.data;
        const [category] = classification.split("/");
        return BuyerFee.getCents(site, category);
    }
    /*
        @argument {Number} authorFeePercents
        @return {Number}
    */
    getAuthorFeeCents(authorFeePercents) {
        const priceCents = this.getPriceCents();
        const buyerFeeCents = this.getBuyerFeeCents();
        return (priceCents - buyerFeeCents) / 100 * authorFeePercents;
    }
    /*
        @argument {String} timeUnitName
        @argument {String} [since]
        @return {Number}
    */
    getTimeValue(timeUnitName, since = "published") {
        const startTime = this.data[`${since}_at`];
        const elapsedTime = Date.now() - Date.parse(startTime);
        return elapsedTime / TimeUnit.valueOf(timeUnitName);
    }
    /*
        @argument {String} [timeUnitName]
        @argument {String} [salesKey]
        @return {Number}
    */
    getSalesNumber(timeUnitName, salesKey = "number_of_sales") {
        const salesNumber = this.data[salesKey];
        if (!timeUnitName) {
            return salesNumber;
        }
        if (timeUnitName === "unit") {
            return 1;
        }
        if (salesKey === "number_of_sales") {
            return Number((salesNumber / this.getTimeValue(timeUnitName)).toFixed(3));
        }
        if (salesKey === "last_week") {
            return salesNumber / (TimeUnit.valueOf("week") / TimeUnit.valueOf(timeUnitName));
        }
        if (salesKey === "last_three_months") {
            return salesNumber / (TimeUnit.valueOf("quarter") / TimeUnit.valueOf(timeUnitName));
        }
        throw new Error(`Invalid key: "${salesKey}"`);
    }
    /*
        @argument {String} [timeUnitName]
        @argument {String} [salesKey]
        @return {Number}
    */
    getRevenueCents(timeUnitName, salesKey) {
        const priceCents = this.getPriceCents();
        const salesNumber = this.getSalesNumber(timeUnitName, salesKey);
        return priceCents * salesNumber;
    }
    /*
        @argument {Number} authorFeePercents
        @argument {String} [timeUnitName]
        @argument {String} [salesKey]
        @return {Number}
    */
    getProfitCents(authorFeePercents, timeUnitName, salesKey) {
        const priceCents = this.getPriceCents();
        const buyerFeeCents = this.getBuyerFeeCents();
        const authorFeeCents = this.getAuthorFeeCents(authorFeePercents);
        const profitCents = priceCents - buyerFeeCents - authorFeeCents;
        const salesNumber = this.getSalesNumber(timeUnitName, salesKey);
        return profitCents * salesNumber;
    }
}
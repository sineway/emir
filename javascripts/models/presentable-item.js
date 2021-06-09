import {CalculableItem} from "./calculable-item.js";
import {ShortQuantityFormat} from "./short-quantity-format.js";
import TimeUnit from "./time-unit.js";

const minAuthorFeePercents = 12.5;
const maxAuthorFeePercents = 37.5;
const nonExclusivePercents = 55;

export class PresentableItem extends CalculableItem {
    /*
        @argument {Object} data
    */
    constructor(data) {
        super(data);
        this.quantity = new Intl.NumberFormat("en", {maximumFractionDigits: 2});
        this.shortQuantity = new ShortQuantityFormat();
        this.currency = new Intl.NumberFormat("en", {style: "currency", currency: "USD"});
        this.relativeTime = new Intl.RelativeTimeFormat("en");
    }
    /*
        @return {Boolean}
    */
    isExlusive() {
        return this.data.exclusive;
    }
    /*
        @return {String}
    */
    getName() {
        return this.data.name;
    }
    /*
        @return {String}
    */
    getPrice() {
        const priceCents = this.getPriceCents();
        return this.currency.format(priceCents / 100);
    }
    /*
        @return {String}
    */
    getBuyerFee() {
        const buyerFeeCents = this.getBuyerFeeCents();
        return this.currency.format(buyerFeeCents / 100);
    }
    /*
        @return {String}
    */
    getAuthorFee() {
        if (!this.isExlusive()) {
            const authorFeeCents = this.getAuthorFeeCents(nonExclusivePercents);
            return this.currency.format(authorFeeCents / 100);
        }
        const minAuthorFeeCents = this.getAuthorFeeCents(minAuthorFeePercents);
        const maxAuthorFeeCents = this.getAuthorFeeCents(maxAuthorFeePercents);
        const minAuthorFee = this.currency.format(minAuthorFeeCents / 100);
        const maxAuthorFee = this.currency.format(maxAuthorFeeCents / 100);
        return `${minAuthorFee} - ${maxAuthorFee}`;
    }
    /*
        @return {String}
    */
    getTime({unit, since} = {}) {
        const timeUnitName = unit || TimeUnit.nameFrom(this.getTimeValue("millisecond", since));
        const elapsedUnits = this.getTimeValue(timeUnitName, since);
        return this.relativeTime.format(-Math.round(elapsedUnits), timeUnitName);
    }
    /*
        @return {String}
    */
    getAge(options) {
        return this.getTime(options).split(" ").slice(0, 2).join(" ");
    }
    /*
        @return {String}
    */
    getSales({per: timeUnitName, by: salesKey, short} = {}) {
        const salesNumber = this.getSalesNumber(timeUnitName, salesKey);
        const formatterName = short ? "shortQuantity" : "quantity";
        return this[formatterName].format(salesNumber);
    }
    /*
        @return {String}
    */
    getRevenue({per: timeUnitName, by: salesKey, short} = {}) {
        const revenueCents = this.getRevenueCents(timeUnitName, salesKey);
        const formatterName = short ? "shortQuantity" : "currency";
        const revenue = this[formatterName].format(revenueCents / 100);
        return short ? `≈ ${revenue}` : revenue;
    }
    /*
        @return {String}
    */
    getProfit({per: timeUnitName, by: salesKey, short} = {}) {
        const formatterName = short ? "shortQuantity" : "currency";
        if (!this.isExlusive()) {
            const profitCents = this.getProfitCents(nonExclusivePercents, timeUnitName, salesKey);
            const profit = this[formatterName].format(profitCents / 100);
            return (short && timeUnitName !== "unit") ? `≈ ${profit}` : profit;
        }
        const minProfitCents = this.getProfitCents(maxAuthorFeePercents, timeUnitName, salesKey);
        const maxProfitCents = this.getProfitCents(minAuthorFeePercents, timeUnitName, salesKey);
        const minProfit = this[formatterName].format(minProfitCents / 100);
        const maxProfit = this[formatterName].format(maxProfitCents / 100);
        return short ? `≈ ${maxProfit}` : `${minProfit} - ${maxProfit}`;
    }
}
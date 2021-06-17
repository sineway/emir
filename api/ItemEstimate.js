import buyerFees from "/api/data/buyer-fees.js";
import authorLevels from "/api/data/author-levels.js";
import authorFees from "/api/data/author-fees.js";
/**
    @class ItemEstimate
    @param {Object} properties
*/
export class ItemEstimate {
    constructor(properties) {
        let [site] = properties.site.split(".");
        let [category] = properties.category.split("/");
        /**
            @type {Number}
        */
        this.buyerFee = buyerFees[`${ site }/${ category }`] ?? 0;
        /**
            @type {Boolean}
        */
        this.exclusive = properties.exclusive ?? true;
        /**
            @type {Number}
        */
        this.authorLevel = properties.authorLevel ?? 0;
        /**
            @type {Number}
        */
        this.authorFeeRate = authorFees.nonExclusivePercent / 100;
        if (this.exclusive) {
            let nextLevel = Math.min(this.authorLevel + 1, authorLevels.length);
            let maxLevelAmount = authorLevels.find(item => {
                return item.level == nextLevel;
            }).amount - 1;
            this.authorFeeRate = authorFees.exclusive.find((item, index, list) => {
                let next = list[index + 1];
                return next == null || next.amount > maxLevelAmount;
            }).percent / 100;
        }
        /**
            @type {Number}
        */
        this.listPrice = properties.listPrice;
        /**
            @type {Number}
        */
        this.price = this.listPrice - this.buyerFee;
        /**
            @type {Number}
        */
        this.sales = properties.sales;
        /**
            @type {Number}
        */
        this.age = properties.age;
        this.withTaxRate(0);
    }
    /**
        @param {Number} taxRate
        @returns {ItemEstimate}
    */
    withTaxRate(taxRate) {
        /**
            @type {Number}
        */
        this.taxRate = taxRate;
        /**
            @type {Number}
        */
        this.tax = this.price * this.taxRate;
        /**
            @type {Number}
        */
        this.authorFee = (this.price - this.tax) * this.authorFeeRate;
        /**
            @type {Number}
        */
        this.profit = this.price - this.tax - this.authorFee;
        return this;
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    salesFor(period) {
        return this.sales / (this.age / period);
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    revenueFor(period) {
        return this.listPrice * this.sales / (this.age / period);
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    profitFor(period) {
        return this.profit * this.sales / (this.age / period);
    }
}
export default ItemEstimate;

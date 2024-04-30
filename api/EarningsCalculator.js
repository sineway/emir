/**
 * @class EarningsCalculator
 */
export class EarningsCalculator {
    /**
     * @type {Number}
     */
    period;
    /**
     * @type {Number}
     */
    sales;
    /**
     * @type {Number}
     */
    listPrice;
    /**
     * @type {Number}
     */
    buyerFee;
    /**
     * @type {Number}
     */
    usTaxRate;
    /**
     * @type {Number}
     */
    usBuyersRatio;
    /**
     * @type {Number}
     */
    authorFeeRate;
    /**
     * @param {Object} [properties]
     */
    constructor(properties = {}) {
        Object.keys(this).forEach((name) => {
            if (!properties.hasOwnProperty(name)) {
                throw new Error(`Missing property <${name}>`);
            }
            this[name] = properties[name];
        });
    }
    /**
     * @type {Number}
     * @readonly
     */
    get price() {
        return this.listPrice - this.buyerFee;
    }
    /**
     * @type {Number}
     * @readonly
     */
    get usTax() {
        return this.price * this.usTaxRate * this.usBuyersRatio;
    }
    /**
     * @type {Number}
     * @readonly
     */
    get authorFee() {
        return (this.price - this.usTax) * this.authorFeeRate;
    }
    /**
     * @type {Number}
     * @readonly
     */
    get earnings() {
        return this.price - this.usTax - this.authorFee;
    }
    /**
     * @param {Number} period
     * @returns {Number}
     */
    salesFor(period) {
        return this.sales / (this.period / period);
    }
    /**
     * @param {Number} period
     * @returns {Number}
     */
    revenueFor(period) {
        return this.listPrice * this.salesFor(period);
    }
    /**
     * @param {Number} period
     * @returns {Number}
     */
    earningsFor(period) {
        return this.earnings * this.salesFor(period);
    }
}
export default EarningsCalculator;

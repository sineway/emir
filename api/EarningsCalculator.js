/**
    @class EarningsCalculator
    @param {Object} fields
*/
export class EarningsCalculator {
    constructor(fields) {
        /**
            @type {Number}
        */
        this.period = fields.period
        /**
            @type {Number}
        */
        this.sales = fields.sales
        /**
            @type {Number}
        */
        this.listPrice = fields.listPrice
        /**
            @type {Number}
        */
        this.buyerFee = fields.buyerFee
        /**
            @type {Number}
        */
        this.taxRate = fields.taxRate
        /**
            @type {Number}
        */
        this.authorFeeRate = fields.authorFeeRate
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
    get tax() {
        return this.price * this.taxRate
    }
    /**
        @readonly
        @type {Number}
    */
    get authorFee() {
        return (this.price - this.tax) * this.authorFeeRate
    }
    /**
        @readonly
        @type {Number}
    */
    get earnings() {
        return this.price - this.tax - this.authorFee
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    salesPer(period) {
        return this.sales / (this.period / period)
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    revenuePer(period) {
        return this.listPrice * this.salesPer(period)
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    earningsPer(period) {
        return this.earnings * this.salesPer(period)
    }
}
export default EarningsCalculator
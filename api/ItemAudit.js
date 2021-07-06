/**
    @class ItemAudit
    @param {Object} fields
*/
export class ItemAudit {
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
    salesFor(period) {
        return this.sales / (this.period / period)
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    revenueFor(period) {
        return this.listPrice * this.salesFor(period)
    }
    /**
        @param {Number} period
        @returns {Number}
    */
    earningsFor(period) {
        return this.earnings * this.salesFor(period)
    }
}
export default ItemAudit

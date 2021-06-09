import QuantityUnit from "./quantity-unit.js";

export class ShortQuantityFormat {
    constructor() {
        this.twoFractionDigits = new Intl.NumberFormat("en", {maximumFractionDigits: 2});
        this.oneFractionDigit = new Intl.NumberFormat("en", {maximumFractionDigits: 1});
        this.zeroFractionDigits = new Intl.NumberFormat("en", {maximumFractionDigits: 0});
        this.symbols = {thousand: "k", million: "m", billion: "b"};
    }
    /*
        @argument {Number} value
        @return {String}
    */
    format(value) {
        const unitName = QuantityUnit.nameFrom(value);
        if (value >= 1000) {
            value /= QuantityUnit.valueOf(unitName);
        }
        if (value < 1) {
            return this.twoFractionDigits.format(value);
        }
        if (value < 10) {
            value = this.oneFractionDigit.format(value);
        } else {
            value = this.zeroFractionDigits.format(value);
        }
        return value + (this.symbols[unitName] || "");
    }
}
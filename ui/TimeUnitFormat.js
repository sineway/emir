import TimeUnit from "/api/TimeUnit.js";
/**
    @class TimeUnitFormat
    @param {Object=} properties
*/
export class TimeUnitFormat {
    constructor(properties = {}) {
        /**
            @type {(String|Array<String>)}
        */
        this.locale = properties.locale ?? [];
        /**
            @type {String}
        */
        this.style = properties.style ?? "long";
    }
    /**
        @param {Number} value
        @returns {String}
    */
    format(value) {
        let name = TimeUnit.measure(value);
        return Intl.NumberFormat(this.locale, {
            style: "unit",
            unit: name.toLowerCase(),
            unitDisplay: this.style
        }).format(
            Math.round(value / TimeUnit[name])
        );
    }
}
export default TimeUnitFormat;

import {Unit} from "./unit.js";

export class QuantityUnit extends Unit {
    constructor() {
        super();
        this.one = 1;
        this.ten = 10;
        this.hundred = 100;
        this.thousand = 1000;
        this.million = 10 ** 6;
        this.billion = 10 ** 9;
    }
}

export default new QuantityUnit();
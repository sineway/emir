import {Unit} from "./unit.js";

export class TimeUnit extends Unit {
    constructor() {
        super();
        this.millisecond = 1;
        this.second = 1000;
        this.minute = 60 * this.second;
        this.hour = 60 * this.minute;
        this.day = 24 * this.hour;
        this.week = 7 * this.day;
        this.month = 30 * this.day;
        this.quarter = 90 * this.day;
        this.year = 365 * this.day;
    }
}

export default new TimeUnit();
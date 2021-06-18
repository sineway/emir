import {html} from "./tags.js";
import {escHTML} from "./sanitizers.js";
import {menu, chevronDown} from "./icons.js";

/*
    @argument {PresentableItem} item
    @argument {Array} [averageEntries]
    @return {String}
*/
export const popup = (item, averageEntries = [
    ["Hourly", "hour"],
    ["Daily", "day"],
    ["Weekly", "week"],
    ["Monthly", "month"],
    ["Quarterly", "quarter"],
    ["Annualy", "year"]
]) => html`
    <div class="banner">
        <div class="banner__margin">
            <a class="button" href="/options.html" aria-label="Settings">
                ${menu()}
            </a>
        </div>
        <div class="banner__content">
            ${item.getTime({since: "updated"}) === item.getTime() ? html`
            <span class="banner__overline">
                No updates
            </span>
            ` : html`
            <span class="banner__overline" title="${item.getAge({since: "updated", unit: "day"})}">
                Updated ${item.getTime({since: "updated"})}
            </span>
            `}
            <h1 class="banner__title">
                ${escHTML(item.getName())}
            </h1>
            <span class="banner__sticker" title="Price:  ${item.getPrice()}
Buyer fee:  ${item.getBuyerFee()}
Author fee:  ${item.getAuthorFee()}
---
${item.getProfit({per: "unit"})}">
                ${item.getProfit({per: "unit", short: true})}
            </span>
        </div>
    </div>
    <div class="table" role="table">
        <div class="table__row table__row--primary" role="row">
            <span class="table__cell" role="cell">Period</span>
            <span class="table__cell" role="cell">Sales</span>
            <span class="table__cell" role="cell">Revenue</span>
            <span class="table__cell" role="cell">Profit</span>
        </div>

        ${item.getSales({by: "last_week"}) !== "0" && html`
        <div class="table__row table__row--secondary" role="row">
            <span class="table__cell" role="cell">
                1 week
            </span>
            <span class="table__cell" role="cell" title="${item.getSales({by: "last_week"})}">
                ${item.getSales({by: "last_week", short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getRevenue({by: "last_week"})}">
                ${item.getRevenue({by: "last_week", short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getProfit({by: "last_week"})}">
                ${item.getProfit({by: "last_week", short: true})}
            </span>
            <button class="button disclosure-button table__disclosure-button" aria-label="Average by last week" aria-controls="average-by-last-week" aria-expanded="false">
                ${chevronDown("filled", "small")}
            </button>
        </div>
        <div class="table__rowgroup" role="rowgroup" id="average-by-last-week">
            ${averageEntries.map(([periodLabel, timeUnitName]) => html`
            <div class="table__row table__row--tertiary" role="row">
                <span class="table__cell" role="cell">
                    ${periodLabel}
                </span>
                <span class="table__cell" role="cell" title="${item.getSales({per: timeUnitName, by: "last_week"})}">
                    ${item.getSales({per: timeUnitName, by: "last_week", short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getRevenue({per: timeUnitName, by: "last_week"})}">
                    ${item.getRevenue({per: timeUnitName, by: "last_week", short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getProfit({per: timeUnitName, by: "last_week"})}">
                    ${item.getProfit({per: timeUnitName, by: "last_week", short: true})}
                </span>
            </div>
            `)}
        </div>
        `}
        ${item.getSales({by: "last_three_months"}) !== "0" && html`
        <div class="table__row table__row--secondary" role="row">
            <span class="table__cell" role="cell">
                3 months
            </span>
            <span class="table__cell" role="cell" title="${item.getSales({by: "last_three_months"})}">
                ${item.getSales({by: "last_three_months", short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getRevenue({by: "last_three_months"})}">
                ${item.getRevenue({by: "last_three_months", short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getProfit({by: "last_three_months"})}">
                ${item.getProfit({by: "last_three_months", short: true})}
            </span>
            <button class="button disclosure-button table__disclosure-button" aria-label="Average by last three months" aria-controls="average-by-last-three-months" aria-expanded="false">
                ${chevronDown("filled", "small")}
            </button>
        </div>
        <div class="table__rowgroup" role="rowgroup" id="average-by-last-three-months">
            ${averageEntries.map(([pariodLabel, timeUnitName]) => html`
            <div class="table__row table__row--tertiary" role="row">
                <span class="table__cell" role="cell">
                    ${pariodLabel}
                </span>
                <span class="table__cell" role="cell" title="${item.getSales({per: timeUnitName, by: "last_three_months"})}">
                    ${item.getSales({per: timeUnitName, by: "last_three_months", short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getRevenue({per: timeUnitName, by: "last_three_months"})}">
                    ${item.getRevenue({per: timeUnitName, by: "last_three_months", short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getProfit({per: timeUnitName, by: "last_three_months"})}">
                    ${item.getProfit({per: timeUnitName, by: "last_three_months", short: true})}
                </span>
            </div>
            `)}
        </div>
        `}

        <div class="table__row table__row--secondary" role="row">
            <span class="table__cell" role="cell" title="${item.getAge({unit: "day"})}">
                ${item.getAge()}
            </span>
            <span class="table__cell" role="cell" title="${item.getSales()}">
                ${item.getSales({short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getRevenue()}">
                ${item.getRevenue({short: true})}
            </span>
            <span class="table__cell" role="cell" title="${item.getProfit()}">
                ${item.getProfit({short: true})}
            </span>
            ${item.getSales() !== "0" && html`
            <button class="button disclosure-button table__disclosure-button" aria-label="Average" aria-controls="average" aria-expanded="false">
                ${chevronDown("filled", "small")}
            </button>
            `}
        </div>
        ${item.getSales() !== "0" && html`
        <div class="table__rowgroup" role="rowgroup" id="average">
            ${averageEntries.map(([pariodLabel, timeUnitName]) => html`
            <div class="table__row table__row--tertiary" role="row">
                <span class="table__cell" role="cell">
                    ${pariodLabel}
                </span>
                <span class="table__cell" role="cell" title="${item.getSales({per: timeUnitName})}">
                    ${item.getSales({per: timeUnitName, short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getRevenue({per: timeUnitName})}">
                    ${item.getRevenue({per: timeUnitName, short: true})}
                </span>
                <span class="table__cell" role="cell" title="${item.getProfit({per: timeUnitName})}">
                    ${item.getProfit({per: timeUnitName, short: true})}
                </span>
            </div>
            `)}
        </div>
        `}
    </div>
`;

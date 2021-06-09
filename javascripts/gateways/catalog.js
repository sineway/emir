import {BaseGateway} from "./base.js";

export class Catalog extends BaseGateway {
    /*
        @argument {Number} itemId
        @return {Promise<Object>}
    */
    getItem(itemId) {
        return this.get(`/v3/market/catalog/item?id=${itemId}`)
            .then((item) => this.addSalesInfo(item))
            .then((item) => this.addExclusivityInfo(item));
    }
    /*
        @argument {Object} item
        @return {Promise<Object>}
    */
    addSalesInfo(item) {
        const [siteName] = item.site.split(".");
        const url = `/v1/market/popular:${siteName}.json`;
        return this.get(url).then((popularItemsData) => {
            const keys = ["items_last_week", "items_last_three_months"];
            keys.forEach((key) => {
                const popItem = popularItemsData.popular[key].find((popItem) => {
                    return item.id === Number(popItem.id);
                });
                const salesKey = key.replace("items_", "");
                item[salesKey] = popItem ? Number(popItem.sales) : null;
            });
            return item;
        });
    }
    /*
        @argument {Object} item
        @return {Promise<Object>}
    */
    addExclusivityInfo(item) {
        const url = `/v1/market/user-badges:${item.author_username}.json`;
        return this.get(url).then((badgesData) => {
            const badgeIndex = badgesData["user-badges"].findIndex((badge) => {
                return badge.name === "exclusive";
            });
            item.exclusive = badgeIndex > -1;
            return item;
        });
    }
}
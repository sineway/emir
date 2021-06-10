/**
    @class Gateway
    @param {Object} properties
*/
export class Gateway {
    constructor(properties) {
        /**
            @type {String}
        */
        this.baseUrl = properties.baseUrl ?? "https://api.envato.com";
        /**
            @type {String}
        */
        this.apiToken = properties.apiToken;
    }
    /**
        @param {String} url
        @returns {Promise<Object>}
    */
    async get(url) {
        let response = await fetch(this.baseUrl + url, {
            headers: { authorization: "bearer " + this.apiToken }
        });
        let json = await response.json();
        if (json.error) {
            throw new Error(json.description);
        }
        return json;
    }
    /**
        @param {String} siteName
        @returns {Promise<Object>} https://build.envato.com/api#market_getPopular
    */
    async getPopular(siteName) {
        let data = await this.get(`/v1/market/popular:${ siteName }.json`);
        return data.popular;
    }
    /**
        @param {String} userName
        @returns {Promise<Array>} https://build.envato.com/api#market_getUserBadges
    */
    async getUserBadges(userName) {
        let data = await this.get(`/v1/market/user-badges:${ userName }.json`);
        return data["user-badges"];
    }
    /*
        @param {Number} itemId
        @returns {Promise<Object>} https://build.envato.com/api/#market_0_getCatalogItem
    */
    async getCatalogItem(itemId) {
        let item = await this.get(`/v3/market/catalog/item?id=${ itemId }`);

        // Aggregate <last_week_sales> and <last_three_months_sales>

        let [siteName] = item.site.split(".");
        let popular = await this.getPopular(siteName);
        [
            "items_last_week",
            "items_last_three_months"
        ].forEach(key => {
            let popItem = popular[key].find(popItem => item.id == popItem.id);
            let salesKey = key.replace("items_", "") + "_sales";
            item[salesKey] = popItem ? Number(popItem.sales) : null;
        });

        // Aggregate <exclusive>

        let badges = await this.getUserBadges(item.author_username);
        item.exclusive = badges.some(badge => badge.name == "exclusive");

        return item;
    }
}
export default Gateway;

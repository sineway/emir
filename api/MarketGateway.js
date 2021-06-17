/**
    @class MarketGateway
    @param {Object} properties
*/
export class MarketGateway {
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
    /**
        @param {Number} itemId
        @returns {Promise<Object>} https://build.envato.com/api/#market_0_getCatalogItem
    */
    async getCatalogItem(itemId) {
        let item = await this.get(`/v3/market/catalog/item?id=${ itemId }`);

        // Aggregate <last_week> and <last_three_months> data.

        let [siteName] = item.site.split(".");
        let popular = await this.getPopular(siteName);
        [
            "items_last_week",
            "items_last_three_months"
        ].forEach(key => {
            let newKey = key.replace("items_", "");
            item[newKey] = popular[key].find(popItem => popItem.id == item.id);
        });

        // Aggregate <author_badges>

        item.author_badges = await this.getUserBadges(item.author_username);
        return item;
    }
}
export default MarketGateway;

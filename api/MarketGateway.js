/**
 * @class MarketGateway
 */
export class MarketGateway {
    /**
     * @type {String}
     */
    baseUrl = 'https://api.envato.com';
    /**
     * @type {String}
     */
    apiToken = 'E7ieDZHeScK3I81zGfWpdRZjmxFvOvo5';
    /**
     * @param {String} url
     * @returns {Promise<Object>}
     */
    async get(url) {
        let response = await fetch(`${this.baseUrl}${url}`, {
            headers: {authorization: `bearer ${this.apiToken}`},
        });
        let json = await response.json();
        if (json.error) {
            let error = new Error(json.description ?? json.error);
            throw Object.assign(error, {response});
        }
        return json;
    }
    /**
     * @param {String} siteName
     * @returns {Promise<Object>}
     *   https://build.envato.com/api#market_getPopular
     */
    async getPopular(siteName) {
        return this.get(`/v1/market/popular:${siteName}.json`);
    }
    /**
     * @param {String} userName
     * @returns {Promise<Object>} https://build.envato.com/api#market_getUser
     */
    async getUser(userName) {
        return this.get(`/v1/market/user:${userName}.json`);
    }
    /**
     * @param {String} userName
     * @returns {Promise<Object>}
     *   https://build.envato.com/api#market_getUserBadges
     */
    async getUserBadges(userName) {
        return this.get(`/v1/market/user-badges:${userName}.json`);
    }
    /**
     * @param {Number} itemId
     * @returns {Promise<Object>}
     *   https://build.envato.com/api/#market_0_getCatalogItem
     */
    async getCatalogItem(itemId) {
        return this.get(`/v3/market/catalog/item?id=${itemId}`);
    }
    /**
     * @returns {Promise<Object>}
     *   https://build.envato.com/api/#market_getTotalItems
     */
    async getTotalItems() {
        return this.get('/v1/market/total-items.json');
    }
}
export default MarketGateway;

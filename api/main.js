import MarketGateway from "/api/MarketGateway.js";
import ItemAudit from "/api/ItemAudit.js";
import TimeUnit from "/api/TimeUnit.js";

let marketGateway = new MarketGateway;
export default browser.storage.local.get("apiToken").then(data => {
    marketGateway.apiToken = data.apiToken;
});
browser.storage.onChanged.addListener(changes => {
    if (changes.apiToken) {
        marketGateway.apiToken = changes.apiToken.newValue;
    }
});
/**
    @namespace
*/
window.application = new class Application {
    /**
        @param {Number} itemId
        @returns {Promise<Object>}
    */
    async load(itemId) {
        let item = await marketGateway.getCatalogItem(itemId);
        let [
            popular,
            userBadges
        ] = await Promise.all([
            marketGateway.getPopular(item.site.split(".").shift()),
            marketGateway.getUserBadges(item.author_username)
        ]);
        item.lastWeek = popular.items_last_week.find(item => {
            return item.id == itemId;
        });
        item.lastQuarter = popular.items_last_three_months.find(item => {
            return item.id == itemId;
        });
        item.authorBadges = userBadges;
        return item;
    }
    /**
        @param {Object} item
        @returns {Object<String,ItemAudit>}
    */
    audit(item) {
        let common = {
            site: item.site.split(".").shift(),
            category: item.classification.split("/").shift(),

            exclusive: item.authorBadges.some(badge => {
                return badge.name == "exclusive";
            }),
            authorLevel: Number(
                item.authorBadges.find(badge => {
                    return badge.name.startsWith("author_level");
                })?.name.split("_").pop() ?? ""
            ),
            listPrice: item.price_cents / 100
        };
        return {
            allTime: new ItemAudit({
                ...common,
                sales: item.number_of_sales,
                age: Date.now() - Date.parse(item.published_at)
            }),
            lastWeek: item.lastWeek && new ItemAudit({
                ...common,
                sales: Number(item.lastWeek.sales),
                age: TimeUnit.WEEK
            }),
            lastQuarter: item.lastQuarter && new ItemAudit({
                ...common,
                sales: Number(item.lastQuarter.sales),
                age: 3 * TimeUnit.MONTH
            })
        };
    }
};

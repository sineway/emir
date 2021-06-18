import { Catalog } from "/javascripts/gateways/catalog.js";

let catalog = new Catalog;
let pattern = new RegExp([
    "^https:\\/\\/",
    "(?:themeforest|codecanyon|videohive|audiojungle|graphicriver|photodune|3docean)\\.net",
    "\\/item",
    "\\/[a-z-0-9]+",
    "\\/([0-9]+)"
].join(""));

let loadData = async url => {
    let [, itemId] = pattern.exec(url);
    let auth = await browser.storage.sync.get(["apiToken"]);
    return Object.assign(catalog, auth).getItem(itemId);
};

window.dataLoaded = {};

browser.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (tab.status === "complete" && pattern.test(tab.url)) {
        dataLoaded[tab.id] = loadData(tab.url);
        browser.pageAction.show(tab.id);
    }
});

browser.tabs.onRemoved.addListener(tabId => {
    delete dataLoaded[tabId];
});

browser.storage.onChanged.addListener(async changes => {
    if ("apiToken" in changes) {
        let [tab] = await browser.tabs.query({ active: true });
        dataLoaded[tab.id] = loadData(tab.url);
    }
});

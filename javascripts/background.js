import {Catalog} from "./gateways/catalog.js";

const pattern = new RegExp([
    "^https:\\/\\/",
    "(?:themeforest|codecanyon|videohive|audiojungle|graphicriver|photodune|3docean)\\.net",
    "\\/item",
    "\\/[a-z-0-9]+",
    "\\/([0-9]+)"
].join(""));

const loadData = (url) => {
    const [, itemId] = pattern.exec(url);
    return new Promise((resolve) => {
        chrome.storage.sync.get(["apiToken"], resolve);
    }).then(({apiToken}) => {
        return new Catalog(apiToken).getItem(itemId);
    });
};

window.dataLoaded = {};

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (tab.status === "complete" && pattern.test(tab.url)) {
        dataLoaded[tab.id] = loadData(tab.url);
        chrome.pageAction.show(tab.id);
    }
});

chrome.tabs.onRemoved.addListener((tabId, info) => {
    delete dataLoaded[tabId];
});

chrome.storage.onChanged.addListener((changes, area) => {
    chrome.tabs.query({active: true}, ([tab]) => {
        dataLoaded[tab.id] = loadData(tab.url);
    });
});
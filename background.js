import defaults from '/defaults.js';

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    title: chrome.i18n.getMessage('context_menu'),
    id: 'link',
    contexts: ['link'],
    targetUrlPatterns: [
        '*://themeforest.net/item/*',
        '*://codecanyon.net/item/*',
        '*://videohive.net/item/*',
        '*://audiojungle.net/item/*',
        '*://graphicriver.net/item/*',
        '*://photodune.net/item/*',
        '*://3docean.net/item/*',
    ],
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    let [path, id] = info.linkUrl.match(/\/item(?:\/[\w-]+)+\/(\d+)/);
    let settings = await chrome.storage.local.get(defaults);
    chrome.windows.create({
        type: 'popup',
        url: `/estimates.html?${new URLSearchParams({id})}`,
        width: settings.baseWidth,
        height: settings.baseHeight,
    });
});

chrome.runtime.onInstalled.addListener(async () => {
    let info = await chrome.management.getSelf();
    if (info.installType == 'development') {
        chrome.tabs.create({
            url: '/bookmarks.html',
        });
    }
});

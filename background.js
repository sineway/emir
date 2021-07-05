browser.contextMenus.removeAll().then(() => {
    let patterns = [
        "*://themeforest.net/item/*",
        "*://codecanyon.net/item/*",
        "*://videohive.net/item/*",
        "*://audiojungle.net/item/*",
        "*://graphicriver.net/item/*",
        "*://photodune.net/item/*",
        "*://3docean.net/item/*"
    ];
    let title = browser.i18n.getMessage("command");

    browser.contextMenus.create({
        contexts: ["page"],
        id: "audit_document",
        documentUrlPatterns: patterns,
        title
    });
    browser.contextMenus.create({
        contexts: ["link"],
        id: "audit_target",
        targetUrlPatterns: patterns,
        title
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId.startsWith("audit")) {
        let url = info.linkUrl ?? info.pageUrl;
        let [all, itemId] = url.match("/([0-9]+)");
        browser.windows.create({
            type: "popup",
            url: `/audit.html?id=${ itemId }`,
            width: 384,
            height: 608
        });
    }
});

browser.runtime.onInstalled.addListener(() => {
	browser.contextMenus.create({
		title: browser.i18n.getMessage("context_menu"),
		id: "link",
		contexts: ["link"],
		targetUrlPatterns: [
			"*://themeforest.net/item/*",
			"*://codecanyon.net/item/*",
			"*://videohive.net/item/*",
			"*://audiojungle.net/item/*",
			"*://graphicriver.net/item/*",
			"*://photodune.net/item/*",
			"*://3docean.net/item/*"
		]
	})
})

browser.contextMenus.onClicked.addListener(async info => {
	let [path, id] = info.linkUrl.match(/\/item(?:\/[\w-]+)+\/(\d+)/)
	let settings = await browser.storage.local.get()
	browser.windows.create({
		type: "popup",
		url: `/estimates.html?${ new URLSearchParams({ id }) }`,
		width: Math.round(settings.baseWidth * devicePixelRatio),
		height: Math.round(settings.baseHeight * devicePixelRatio)
	})
})

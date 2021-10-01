import PageOptions from "/ui/PageOptions.js"

browser.runtime.onInstalled.addListener(() => {
	let patterns = [
		"*://themeforest.net/item/*",
		"*://codecanyon.net/item/*",
		"*://videohive.net/item/*",
		"*://audiojungle.net/item/*",
		"*://graphicriver.net/item/*",
		"*://photodune.net/item/*",
		"*://3docean.net/item/*"
	]
	let title = browser.i18n.getMessage("context_menu")

	browser.contextMenus.create({
		contexts: ["page"],
		id: "page",
		documentUrlPatterns: patterns,
		title
	})
	browser.contextMenus.create({
		contexts: ["link"],
		id: "link",
		targetUrlPatterns: patterns,
		title
	})
})

browser.contextMenus.onClicked.addListener(info => {
	let [path, id] = (info.linkUrl ?? info.pageUrl).match(/\/item\/[\w-]+\/(\d+)/)
	let pageOptions = new PageOptions
	browser.windows.create({
		type: "popup",
		url: `/estimates.html?${ new URLSearchParams({ id }) }`,
		width: Math.round(pageOptions.baseWidth * devicePixelRatio),
		height: Math.round(pageOptions.baseHeight * devicePixelRatio)
	})
})

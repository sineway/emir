import defaults from "/defaults.js"
import Page from "/ui/Page.js"

chrome.storage.local.get(defaults).then(async settings => {
	let page = new Page(settings)

	await page.render(() => {
		return {
			title: chrome.i18n.getMessage("name"),
			header: {
				title: chrome.i18n.getMessage("settings"),
				navButton: {
					label: chrome.i18n.getMessage("go_back"),
					url: new URL(location).searchParams.get("return")
				}
			},
			appearance: {
				title: chrome.i18n.getMessage("settings__appearance"),
				colorScheme: (() => {
					let [title, description, ...rest] =
						chrome.i18n.getMessage("settings__color_scheme").split("\\")
					let options = ["light", "dark"].map((value, index) => ({
						label: rest[index],
						value,
						checked: settings.colorScheme == value,
						autofocus: settings.colorScheme == value
					}))
					return { title, description, options }
				})(),
				hue: (() => {
					let [title, description] =
						chrome.i18n.getMessage("settings__hue").split("\\")
					return {
						title,
						description,
						placeholder: defaults.hue,
						value: settings.hue
					}
				})(),
				authorBadges: (() => {
					let [title, description, ...rest] =
						chrome.i18n.getMessage("settings__author_badges").split("\\")
					let options = Object.keys(defaults)
						.filter(key => key.endsWith("Badge"))
						.map((name, index) => ({
							label: rest[index],
							name,
							checked: settings[name]
						}))
					return { title, description, options }
				})()
			},
			calculations: {
				title: chrome.i18n.getMessage("settings__calculations"),
				usBuyersPercent: (() => {
					let [title, description] =
						chrome.i18n.getMessage("settings__us_buyers_percent").split("\\")
					return {
						title,
						description,
						placeholder: defaults.usBuyersPercent,
						value: settings.usBuyersPercent
					}
				})()
			}
		}
	})
	addEventListener("input", ({ target }) => {
		if (target.value == "") {
			chrome.storage.local.set({
				[target.name]: defaults[target.name]
			})
		}
		else if (target.checkValidity?.()) {
			let key = "value"
			if (target.type == "number") {
				key = "valueAsNumber"
			} else if (target.type == "checkbox") {
				key = "checked"
			}
			chrome.storage.local.set({
				[target.name]: target[key]
			})
		}
	})
})

import Page from "/ui/Page.js"
import defaults from "/defaults.js"

let page = new Page
page.render(async () => {
	let url = new URL(location)
	let settings = await browser.storage.local.get(defaults)
	return {
		title: browser.i18n.getMessage("name"),
		header: {
			title: browser.i18n.getMessage("settings"),
			navButton: {
				label: browser.i18n.getMessage("go_back"),
				url: url.searchParams.get("return")
			}
		},
		appearance: {
			title: browser.i18n.getMessage("settings__appearance"),
			colorScheme: (() => {
				let [title, description, ...rest] =
					browser.i18n.getMessage("settings__color_scheme").split("\\")
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
					browser.i18n.getMessage("settings__hue").split("\\")
				return {
					title,
					description,
					placeholder: defaults.hue,
					value: settings.hue
				}
			})(),
			authorBadges: (() => {
				let [title, description, ...rest] =
					browser.i18n.getMessage("settings__author_badges").split("\\")
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
			title: browser.i18n.getMessage("settings__calculations"),
			usBuyersPercent: (() => {
				let [title, description] =
					browser.i18n.getMessage("settings__us_buyers_percent").split("\\")
				return {
					title,
					description,
					placeholder: defaults.usBuyersPercent,
					value: settings.usBuyersPercent
				}
			})()
		}
	}
}).then(async () => {
	addEventListener("input", ({ target }) => {
		if (target.value == "") {
			browser.storage.local.set({
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
			browser.storage.local.set({
				[target.name]: target[key]
			})
		}
	})
})




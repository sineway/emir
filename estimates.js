import defaults from "/defaults.js"
import Page from "/ui/Page.js"
import Market from "/api/Market.js"
import TimeUnit from "/api/TimeUnit.js"

let url = new URL(location)
let market = new Market

browser.storage.local.get(defaults).then(async settings => {
	let page = new Page(settings)

	await page.render(async () => {
		let data = await market.estimateItem(url.searchParams.get("id"), {
			usBuyersRatio: settings.usBuyersPercent / 100
		})
		return {
			title: data.item.name,
			header: {
				title: browser.i18n.getMessage("estimates"),
				navButton: {
					url: `/settings.html?${ new URLSearchParams({
						return: `${ url }`.replace(url.origin, "")
					}) }`,
					label: browser.i18n.getMessage("settings")
				},
				authorBadges: Object.keys(defaults).filter(key => {
					return key.endsWith("Badge") && settings[key]
				}).map(key => {
					return key
						.replace(/Badge$/, "")
						.replace(/[A-Z]/g, "_$&")
						.toLowerCase()
				}).map(key => {
					return data["user-badges"]
						.find(badge => badge.name.startsWith(key))
				}).filter(badge => badge)
			},
			estimates: data.estimates.map((item, index) => ({
				count: index + 1,
				period: item.period,
				summary: {
					title: browser.i18n.getMessage("estimates__summary"),
					items: ["sales", "revenue", "earnings"].map((name, index) => {
						let value = item[`${ name }For`](item.period)
						let format = page.template.formats[name == "sales" ? "number" : "currency"]
						return {
							value,
							valueFormatted: format(value),
							label: browser.i18n.getMessage("estimates__summary_items").split("\\")[index]
						}
					})
				},
				revenueChart: {
					title: browser.i18n.getMessage("estimates__revenue_chart"),
					items: ["buyerFee", "usTax", "authorFee", "earnings"].map((key, index) => {
						let value = item[key]
						return {
							label: browser.i18n.getMessage("estimates__revenue_chart_items").split("\\")[index],
							value: value * item.sales,
							ratio: value / item.listPrice
						}
					})
				},
				average: {
					title: browser.i18n.getMessage("estimates__average"),
					columns: browser.i18n.getMessage("estimates__average_columns").split("\\").map(name => {
						return { name }
					}),
					rows: ["Hour", "Day", "Week", "Month", "Year"].map((key, index) => {
						let period = TimeUnit[key.toUpperCase()]
						return {
							period: browser.i18n.getMessage("estimates__average_rows").split("\\")[index],
							sales: item.salesFor(period),
							revenue: item.revenueFor(period),
							earnings: item.earningsFor(period)
						}
					})
				}
			})),
			poweredBy: browser.i18n.getMessage("powered_by")
		}
	})
	addEventListener("hashchange", () => {
		let input = tabs.querySelector(`input[value="${ location.hash }"`)
		if (input) {
			input.checked = true
			input.focus()
		}
	})
	tabs.addEventListener("change", () => {
		location.replace([
			location.pathname,
			location.search,
			tabs.input.value
		].join(""))
	})
	tabs.querySelector("input").checked = true
	tabs.dispatchEvent(new Event("change"))
})

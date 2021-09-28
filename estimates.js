import Page from "/ui/Page.js"
import Market from "/api/Market.js"
import TimeUnit from "/api/TimeUnit.js"

let page = new Page
let market = new Market

page.render(async () => {
	let settings = await browser.storage.local.get({
		...market.gateway,
		...market.parser
	})
	market.gateway.apiToken = settings.apiToken
	market.parser.fallbackTax = settings.fallbackTax

	let url = new URL(location)
	let estimate = await market.estimateItem(url.searchParams.get("id"))

	return {
		title: estimate.name,
		header: {
			title: browser.i18n.getMessage("estimates"),
			navUrl: `/settings.html?${ new URLSearchParams({
				title: estimate.name,
				referer: `${ url.pathname }?${ url.searchParams }`
			}) }`,
			badges: estimate["user-badges"].filter(item => {
				return /^country/.test(item.name)
			})
		},
		records: estimate.records.map((item, index) => ({
			count: index + 1,
			period: item.period,
			summary: {
				title: browser.i18n.getMessage("estimates__summary"),
				items: ["sales", "revenue", "earnings"].map((name, index) => {
					let value = item[`${ name }Per`](item.period)
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
				items: ["buyerFee", "tax", "authorFee", "earnings"].map((key, index) => {
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
						sales: item.salesPer(period),
						revenue: item.revenuePer(period),
						earnings: item.earningsPer(period)
					}
				})
			}
		})),
		poweredBy: browser.i18n.getMessage("powered_by")
	}
}).then(() => {
	let tabs = document.querySelectorAll(`a[href^="#"]`)
	let newURL = tabs.item(0).href

	// 1. Reveal tab panel
	location.replace(newURL)

	// 2. Highlight current tab
	if (tabs.length > 1) {
		addEventListener("hashchange", ({ newURL }) => {
			tabs.forEach(item => {
				item.classList.toggle("button--primary", item.href == newURL)
				// Keep focus during keyboard navigation
				if (item.href == newURL) {
					item.focus()
				}
			})
		})
		dispatchEvent(
			new HashChangeEvent("hashchange", { newURL })
		)
	}
})

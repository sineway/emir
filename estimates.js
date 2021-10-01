import Page from "/ui/Page.js"
import Market from "/api/Market.js"
import TimeUnit from "/api/TimeUnit.js"

let page = new Page
page.render(async () => {
	let defaults = {
		usBuyersPercent: 40,
		countryBadge: true,
		authorLevelBadge: false
	}
	let settings = await browser.storage.local.get(defaults)
	let url = new URL(location)
	let market = new Market
	let estimate = await market.estimateItem(url.searchParams.get("id"), {
		usBuyersRatio: settings.usBuyersPercent / 100
	})
	return {
		title: estimate.name,
		header: {
			title: browser.i18n.getMessage("estimates"),
			navUrl: `/settings.html?${ new URLSearchParams({
				title: estimate.name,
				referer: `${ url.pathname }?${ url.searchParams }`
			}) }`,
			authorBadges: Object.keys(defaults).filter(key => {
				return key.endsWith("Badge") && settings[key]
			}).map(key => {
				return key
					// remove <Badge> suffix
					.slice(0, -5)
					// convert to snake_case
					.replace(/[A-Z]/g, "_$&")
					.toLowerCase()
			}).map(key => {
				return estimate["user-badges"]
					.find(badge => badge.name.startsWith(key))
			}).filter(badge => badge)
		},
		records: estimate.records.map((item, index) => ({
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
}).then(() => {
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

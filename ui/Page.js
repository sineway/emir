import PageTemplate from "./PageTemplate.js"
import TimeUnit from "/api/TimeUnit.js"

let languageCode = chrome.i18n.getUILanguage()
chrome.i18n.detectLanguage(
	chrome.i18n.getMessage("settings__hue") // gives the most accurate result
).then(result => {
	languageCode = result.languages[0].language
})
/**
	@class Page
	@param {Object=} options
*/
export class Page {
	constructor(options = {}) {
		/**
			@type {Number}
		*/
		this.baseWidth = options.baseWidth ?? 0
		/**
			@type {Number}
		*/
		this.baseHeight = options.baseHeight ?? 0
		/**
			@prop {String} colorScheme
		*/
		this.setColorScheme(options.colorScheme ?? "")
		/**
			@prop {Number} hue
		*/
		this.setHue(options.hue ?? 0)

		chrome.storage.onChanged.addListener((changes, area) => {
			if (area == "local") {
				if (changes.colorScheme) {
					this.setColorScheme(changes.colorScheme.newValue)
				}
				else if (changes.hue) {
					this.setHue(changes.hue.newValue)
				}
			}
		})
		this.resize()
		addEventListener("click", event => {
			if (event.target.matches(`a[href^="http"]`)) {
				event.preventDefault()
				chrome.tabs.create({ url: event.target.href })
			}
		})
	}
	/**
		@param {Number} value
	*/
	setColorScheme(value) {
		this.colorScheme = value
		document.documentElement.classList.toggle("page--dark", value == "dark")
	}
	/**
		@param {Number} value
	*/
	setHue(value) {
		this.hue = value
		document.documentElement.style.setProperty("--hue", value)
	}
	/**
		@returns {Promise}
	*/
	async resize() {
		let currentWindow = await chrome.windows.getCurrent()
		if (currentWindow.type == "popup") {
			await chrome.windows.update(currentWindow.id, {
				width: Math.round(this.baseWidth * devicePixelRatio),
				height: Math.round(this.baseHeight * devicePixelRatio)
			})
			matchMedia(
				`(resolution: ${ devicePixelRatio }dppx)`
			).addEventListener("change", () => {
				this.resize()
			}, {
				once: true
			})
		}
	}
	/**
		@type {PageTemplate}
	*/
	template = new PageTemplate({
		formats: {
			duration: value => {
				let name = TimeUnit.measure(value)
				return (value / TimeUnit[name]).toLocaleString(languageCode, {
					style: "unit",
					unit: name.toLowerCase(),
					unitDisplay: "long",
					maximumFractionDigits: 0
				})
			},
			number: new Intl.NumberFormat("en-US", {
				maximumFractionDigits: 2
			}).format,

			compact: new Intl.NumberFormat("en-US", {
				notation: "compact",
				compactDisplay: "short"
			}).format,

			currency: new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD"
			}).format,

			percent: new Intl.NumberFormat("en-US", {
				style: "percent"
			}).format
		}
	})
	/**
		@param {Function} callback
		@returns {Promise}
	*/
	async render(callback) {
		let data = {}
		try {
			document.title = chrome.i18n.getMessage("loading")
			document.documentElement.classList.add("page--loading")
			data.page = await callback()
		}
		catch (error) {
			console.error(error)
			let errorCode = error.response?.status ?? ""
			data.error = {
				title: chrome.i18n.getMessage("error", [errorCode]),
				description: error.message
			}
			if (errorCode == 429) {
				let seconds = error.response.headers.get("retry-after")
				data.error.description = chrome.i18n.getMessage("error_429", [
					this.template.formats.duration(seconds * 1000)
				])
			}
		}
		finally {
			document.title = (data.page ?? data.error).title
			document.documentElement.classList.remove("page--loading")
			this.template.render(data)
		}
	}
}
export default Page

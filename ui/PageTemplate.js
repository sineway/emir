/**
	@class PageTemplate
*/
export class PageTemplate {
	/**
		@type {RegExp}
	*/
	tagPattern = new RegExp([
		"(?<tagStart>\\{\\{)",
		"(?<raw>&)?",
		"(?<path>[\\w.]+)",
		"(?:\\|", "(?<format>\\w+))?",
		"(?<tagEnd>\\}\\})"
	].join("\\s*"), "g")
	/**
		@type {Array}
	*/
	htmlEscape = [/[&<>"']/g, char => `&#${ char.codePointAt(0) };`]
	/**
		@type {Object}
	*/
	formats = {}
	/**
		@type {DOMParser}
	*/
	domParser = new DOMParser
	/**
		@param {Object=} properties
	*/
	constructor(properties = {}) {
		Object.seal(this)
		Object.assign(this, properties)
	}
	/**
		@param {Object} data
		@param {Node=} root
	*/
	render(data = {}, root = document) {
		root.querySelectorAll("template[data-path]").forEach(template => {
			let value = this.resolveValue(data, {
				path: template.getAttribute("data-path")
			})
			let fragments = [].concat(value ?? []).map(data => {
				let root = template.content.cloneNode(true)
				this.interpolate(root, data)
				this.render(data, root)
				return root
			})
			template.before(...fragments)
		})
	}
	/**
		@param {Node} root
		@param {Object} data
	*/
	interpolate(root, data) {
		if (root.attributes) {
			[...root.attributes].forEach(attr => {
				this.interpolateAttr(attr, data)
			})
		}
		root.childNodes.forEach(node => {
			if (node.nodeType == Node.TEXT_NODE) {
				this.interpolateText(node, data)
			} else {
				this.interpolate(node, data)
			}
		})
	}
	/**
		@param {Attr} attr
		@param {Object} data
	*/
	interpolateAttr(attr, data) {
		if (attr.nodeName.endsWith("?")) {
			let name = attr.nodeName.slice(0, -1)
			attr.ownerElement.toggleAttribute(name, data[name])
			attr.ownerElement.removeAttribute(attr.nodeName)
		}
		else if (this.tagPattern.test(attr.nodeValue)) {
			attr.nodeValue = attr.nodeValue.replace(this.tagPattern, (...matches) => {
				return this.resolveValue(data, matches.pop())
			})
		}
	}
	/**
		@param {Text} text
		@param {Object} data
	*/
	interpolateText(text, data) {
		if (this.tagPattern.test(text.nodeValue)) {
			let newValue = text.nodeValue.replace(this.tagPattern, (...matches) => {
				let groups = matches.pop()
				let value = this.resolveValue(data, groups)
				return groups.raw ? value : `${ value }`.replace(...this.htmlEscape)
			})
			let document = this.domParser.parseFromString(newValue, "text/html")
			text.replaceWith(...document.body.childNodes)
		}
	}
	/**
		@param {Object} data
		@param {Object} groups
		@returns {*}
	*/
	resolveValue(data, groups) {
		let { path, format } = groups
		let value = path.split(".").reduce((target, key) => target?.[key], data)
		if (format) {
			return this.formats[format]?.(value)
		}
		return value
	}
}
export default PageTemplate

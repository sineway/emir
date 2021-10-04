/**
	@class NumberField
	@extends HTMLElement
*/
export class NumberField extends HTMLElement {
	constructor() {
		super()
		this.classList.add("text-field")
		this.attachShadow({ mode: "open" })
		this.shadowRoot.innerHTML = `
			<style>
				@import "/ui/elements/icon.css";
				@import "/ui/elements/button.css";
				@import "/ui/elements/text-field.css";
			</style>
			<slot>
				<input type="number">
			</slot>
			<button class="button button--narrow text-field__button" tabindex="-1">
				<span class="icon icon--remove"></span>
			</button>
			<button class="button button--narrow text-field__button" tabindex="-1">
				<span class="icon icon--add"></span>
			</button>
		`
		let slot = this.shadowRoot.querySelector("slot")
		let [numberInput] = slot.assignedElements({ flatten: true })
		numberInput.classList.add("text-field__input")

		let stepButtons = this.shadowRoot.querySelectorAll("button")
		stepButtons.forEach((stepButton, index) => {
			let makeStep = () => {
				numberInput[["stepDown", "stepUp"][index]]()
				numberInput.dispatchEvent(
					new InputEvent("input", { bubbles: true })
				)
			}
			let timerId
			let clearTimers = () => {
				window.clearTimeout(timerId)
				window.clearInterval(timerId)
			}
			stepButton.addEventListener("pointerdown", event => {
				if (event.isPrimary) {
					numberInput.focus()
					timerId = window.setTimeout(() => {
						timerId = window.setInterval(makeStep)
					}, 300)
					event.preventDefault()
					makeStep()
				}
			})
			stepButton.addEventListener("pointerup", event => {
				if (event.isPrimary) {
					clearTimers()
					numberInput.dispatchEvent(
						new Event("change", { bubbles: true })
					)
				}
			})
			stepButton.addEventListener("pointerout", clearTimers)
			stepButton.addEventListener("pointercancel", clearTimers)
			stepButton.addEventListener("contextmenu", clearTimers)
		})
	}
}
export default NumberField
customElements.define("number-field", NumberField)

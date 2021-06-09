export class DisclosureButton {
    /*
        @argument {HTMLButtonElement} element
    */
    constructor(element) {
        this.element = element;
        this.element.addEventListener("click", this);

        const id = this.element.getAttribute("aria-controls");
        this.controlledElement = this.element.ownerDocument.getElementById(id);

        this.expand(this.isExpanded());
    }
    /*
        @return {Boolean}
    */
    isExpanded() {
        return /^(true)?$/.test(this.element.getAttribute("aria-expanded"));
    }
    /*
        @argument {Boolean} flag
    */
    expand(flag) {
        const newHeight = flag ? this.controlledElement.scrollHeight : 0;
        this.controlledElement.style.setProperty("height", `${newHeight}px`);
        this.element.setAttribute("aria-expanded", flag);
        this.element.dispatchEvent(
            new CustomEvent("toggle", {detail: {flag}, bubbles: true})
        );
    }
    /*
        @argument {Event} event
    */
    handleEvent(event) {
        switch (event.type) {
        case "click":
            this.handleClick(event);
            break;
        }
    }
    /*
        @argument {MouseEvent} event
    */
    handleClick(event) {
        this.expand(!this.isExpanded());
    }
}
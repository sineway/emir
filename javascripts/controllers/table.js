import {DisclosureButton} from "./disclosure-button.js";

export class Table {
    /*
        @argument {HTMLElement} element
    */
    constructor(element) {
        this.element = element;
        this.element.addEventListener("toggle", this);

        const buttons = this.element.querySelectorAll(".table__disclosure-button");
        this.buttons = [...buttons].map((element) => new DisclosureButton(element));
    }
    /*
        @argument {Event} event
    */
    handleEvent(event) {
        switch (event.type) {
        case "toggle":
            this.handleToggle(event);
            break;
        }
    }
    /*
        @argument {CustomEvent} event
    */
    handleToggle(event) {
        const tableRow = event.target.closest(".table__row");
        tableRow.classList.toggle("table__row--highlighted", event.detail.flag);
    }
}
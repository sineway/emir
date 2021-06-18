import {BaseRenderer} from "./base.js";
import {options} from "../templates/options.js";

export class OptionsRenderer extends BaseRenderer {
    /*
        @argument {Object} data
    */
    renderSuccess(data) {
        this.insertHTML(options(data));

        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            chrome.storage.sync.set(Object.fromEntries(new FormData(event.target)), () => {
                location.href = chrome.runtime.getURL("/popup.html");
            });
        });
        const anyInvalid = form.querySelector(":invalid");
        if (anyInvalid) {
            anyInvalid.focus();
        }
    }
}

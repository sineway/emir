import {banner} from "../templates/banner.js";
import {loader} from "../templates/icons.js";

export class BaseRenderer {
    /*
        @argument {Object} [options]
    */
    constructor({
        selector = "body",
        before = "",
        after = "",
        preserve = false
    } = {}) {
        this.selector = selector;
        this.before = before;
        this.after = after;
        this.preserve = preserve;
    }
    /*
        @argument {String} html
    */
    insertHTML(html) {
        html = this.before + html + this.after;
        const element = document.querySelector(this.selector);
        if (this.preserve) {
            element.insertAdjacentHTML("beforeend", html);
        } else {
            element.innerHTML = html;
        }
    }
    /*
        @argument {Object} [data]
    */
    renderProgress(data = {}) {
        const {icon = loader, title = "Loading..."} = data;
        this.insertHTML(banner({icon, title}));
    }
    /*
        @argument {Error} error
    */
    renderFailure(error) {
        const [title, ...rest] = error.toString().split(":");
        const content = rest.join(":");
        this.insertHTML(banner({title, content}));
    }
    /*
        @argument {Object} data
    */
    renderSuccess(data) {
        throw new Error("Not implemented");
    }
}
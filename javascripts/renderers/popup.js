import {BaseRenderer} from "./base.js";
import {popup} from "../templates/popup.js";
import {Table} from "../controllers/table.js";

export class PopupRenderer extends BaseRenderer {
    /*
        @argument {Error} error
    */
    renderFailure(error) {
        if (/^(401|403)$/.test(error.status) && (history.length === 1)) {
            location.href = chrome.runtime.getURL("pages/options.html");
        }
        super.renderFailure(error);
    }
    /*
        @argument {PresentableItem} model
    */
    renderSuccess(model) {
        this.insertHTML(popup(model));
        new Table(document.querySelector(".table"));
    }
}
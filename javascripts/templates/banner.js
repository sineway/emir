import {html} from "./tags.js";
import {alertTriangle} from "./icons.js";
import {escHTML} from "./sanitizers.js";

/*
    @argument {Object} data
    @return {String}
*/
export const banner = ({icon = alertTriangle, title, content}) => html`
    <div class="banner">
        <div class="banner__margin">
            ${icon()}
        </div>
        <div class="banner__content">
            ${title && html`
            <h1 class="banner__title">${escHTML(title)}</h1>
            `}
            ${content && html`
            <div class="banner__description">${escHTML(content)}</div>
            `}
        </div>
    </div>
`;
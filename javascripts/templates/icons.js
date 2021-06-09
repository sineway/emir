import {html} from "./tags.js";

/*
    @argument {String} contents
    @argument {...String} [modifiers]
    @return {String}
*/
const container = (contents, ...modifiers) => html`
    <svg class="icon ${modifiers.map((name) => `icon--${name}`)}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        ${contents}
    </svg>
`;

/*
    @argument {...String} [modifiers]
    @return {String}
*/
export const loader = (...modifiers) => container(html`
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
`, ...modifiers);

/*
    @argument {...String} [modifiers]
    @return {String}
*/
export const alertTriangle = (...modifiers) => container(html`
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12" y2="17"></line>
`, ...modifiers);

/*
    @argument {...String} [modifiers]
    @return {String}
*/
export const menu = (...modifiers) => container(html`
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
`, ...modifiers);

/*
    @argument {...String} [modifiers]
    @return {String}
*/
export const arrowLeft = (...modifiers) => container(html`
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
`, ...modifiers);

/*
    @argument {...String} [modifiers]
    @return {String}
*/
export const chevronDown = (...modifiers) => container(html`
    <polyline points="6 9 12 15 18 9"></polyline>
`, ...modifiers);
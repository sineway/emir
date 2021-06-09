import {html} from "./tags.js";
import {arrowLeft} from "./icons.js";

/*
    @argument {Object} data
    @return {String}
*/
export const options = (data) => html`
    <div class="banner">
        <div class="banner__margin">
            <a class="button" href="/pages/popup.html" aria-label="Estimate">
                ${arrowLeft()}
            </a>
        </div>
        <div class="banner__content">
            <h1 class="banner__title">Settings</h1>
            <form class="form">
                <div class="form__group">
                    <span class="text-field">
                        <input class="text-field__input" name="apiToken" value="${data.apiToken}" maxlength="32" pattern="[A-Za-z0-9]{32}" required>
                        <label class="text-field__label">
                            API token
                        </label>
                        <span class="text-field__help-text">
                            Generate one at <a class="anchor" href="https://build.envato.com/create-token" target="_blank" rel="noopener noreferrer">build.envato.com</a>
                        </span>
                    </span>
                </div>
                <div class="form__group">
                    <button class="button button--primary">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    </div>
`;
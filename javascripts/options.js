import {OptionsRenderer} from "./renderers/options.js";

const renderer = new OptionsRenderer();
renderer.renderProgress();

chrome.storage.sync.get(["apiToken"], (data) => {
    renderer.renderSuccess(data);
});
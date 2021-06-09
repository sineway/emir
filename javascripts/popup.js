import {PopupRenderer} from "./renderers/popup.js";
import {PresentableItem} from "./models/presentable-item.js";

const renderer = new PopupRenderer();
renderer.renderProgress();

chrome.runtime.getBackgroundPage(({dataLoaded}) => {
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        dataLoaded[tab.id].then((data) => {
            renderer.renderSuccess(new PresentableItem(data));
        }).catch((error) => {
            renderer.renderFailure(error);
        });
    });
});

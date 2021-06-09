export class BuyerFee {
    constructor() {
        this.themeforest = {
            "site-templates": 400,
            "wordpress": 1200,
            "cms-themes": 1000,
            "ecommerce": 1500,
            "blogging": 500,
            "marketing": 400,
            "forums": 400,
            "psd-templates": 200,
            "muse-templates": 400,
            "sketch-templates": 200,
            "typeengine-themes": 400,
            "static-site-generators": 400,
            "courses": 100,
            "template-kits": 500,
            "ui-templates": 200
        };
        this.codecanyon = {
            "javascript": 200,
            "php-scripts": 500,
            "net": 400,
            "wordpress": 500,
            "plugins": 400,
            "css": 100,
            "html5": 300,
            "mobile": 400,
            "apps": 200,
            "skins": 300,
            "edge-animate-templates": 200
        };
        this.videohive = {
            "after-effects-project-files": 600,
            "premiere-pro-templates": 400,
            "apple-motion-templates": 400,
            "motion-graphics": 300,
            "stock-footage": 300,
            "cinema-4d-templates": 600,
            "add-ons": 0
        };
        this.audiojungle = {
            "music": 400,
            "music-packs": 1200,
            "music-kits": 800,
            "logos-idents": 200,
            "sound": 0,
            "source-files": 700
        };
        this.graphicriver = {
            "graphics": 100,
            "print-templates": 100,
            "epublishing": 300,
            "textures": 100,
            "vectors": 100,
            "infographics": 100,
            "add-ons": 100,
            "isolated-objects": 100,
            "icons": 100,
            "presentation-templates": 300,
            "fonts": 200,
            "web-elements": 100,
            "logo-templates": 500,
            "t-shirts": 200,
            "game-assets": 100
        };
        this.photodune = {
            "misc": 100
        };
        this["3docean"] = {
            "animation-data": 200,
            "3d-models": 300,
            "render-setups": 300,
            "materials-and-shaders": 100,
            "cg-textures": 100,
            "2d-concepts": 200,
            "scripts-and-plugins": 400
        };
    }
    /*
        @argument {String} site
        @argument {String} category
        @return {Number}
    */
    getCents(site, category) {
        const [sitename] = site.split(".");

        if (!this.hasOwnProperty(sitename)) {
            throw new Error(`Cannot get buyer fee for site: "${site}"`);
        }
        if (!this[sitename].hasOwnProperty(category)) {
            throw new Error(`Cannot get buyer fee for category: "${category}"`);
        }
        return this[sitename][category];
    }
}

export default new BuyerFee();

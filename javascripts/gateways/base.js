export class BaseGateway {
    /*
        @argument {String} apiToken
    */
    constructor(apiToken) {
        this.baseUrl = "https://api.envato.com";
        this.apiToken = apiToken;
    }
    /*
        @argument {Object} options
        @return {Promise<XMLHttpRequest>}
    */
    request({
        method,
        url,
        timeout = 0,
        responseType = "json",
        withCredentials = false,
        body = null
    }) {
        return new Promise((resolve, reject) => {
            const httpRequest = new XMLHttpRequest();

            httpRequest.open(method, this.baseUrl + url);
            httpRequest.setRequestHeader("Authorization", `Bearer ${this.apiToken}`);

            httpRequest.timeout = timeout;
            httpRequest.responseType = responseType;
            httpRequest.withCredentials = withCredentials;

            httpRequest.onerror = () => reject(new Error("Unable to send HTTP request"));
            httpRequest.onabort = () => reject(new Error("HTTP request has been aborted"));
            httpRequest.ontimeout = () => reject(new Error("HTTP request timeout exceeded"));
            httpRequest.onload = () => resolve(httpRequest);

            httpRequest.send(body);
        });
    }
    /*
        @argument {String} url
        @return {Object}
    */
    get(url) {
        return this.request({method: "GET", url}).then(({response, status}) => {
            if (response.error) {
                throw Object.assign(new Error(response.error), {status});
            }
            return response;
        });
    }
}
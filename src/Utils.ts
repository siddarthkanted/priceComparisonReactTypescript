// tslint:disable-next-line:no-namespace
export namespace Utils {
    export function format(compositeString: string, ...args: any[]): string {
        let replacedString = compositeString;
        for (let i = 0; i < args.length; i++) {
            const regex = new RegExp("\\{" + i + "\\}", "gi");
            replacedString = replacedString.replace(regex, args[i]);
        }

        return replacedString;
    }

    export function convertToSlug(text: string): string {
        return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    export function getBaseUrl(): string {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }

    export function getUrl(page: string, ...urlPart: string[]): string {
        const urlAllParts = [page, ...urlPart.map(x => Utils.convertToSlug(x))];
        const urlString = urlAllParts.join("/")
        return new URL(urlString, Utils.getBaseUrl()).toString();
    }

    export function getHostNameFromUrl(urlString: string): string {
        const url = new URL(urlString);
        return url.host; // localhost:8080
    }

    export function generateUrlParameters(urlParameters: {}): string {
        const paraExpressions: string[] = [];
        Object.keys(urlParameters).forEach(key => paraExpressions.push(`${key}=${urlParameters[key]}`));
        return paraExpressions.join("&");
    }

    /**
     * 
     * @param requestType can be "POST" or "GET"
     * @param baseUrl Example https://travel.paytm.com/api/flights/v1/airports/c
     * @param urlParameters Object which contains the parameters to be transfered, Example version=2&international=true&client=web
     */
    export function sendRequest(
        requestType: string,
        baseUrl: string,
        urlParameters: {}
    ): Promise<any> {
        const generatedQueryParams = urlParameters ? "?" + generateUrlParameters(urlParameters) : "";
        const url = new URL(baseUrl + generatedQueryParams);
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open(requestType, url.toString());
            xmlhttp.onload = () => {
                if (xmlhttp.status >= 200 && xmlhttp.status < 303) {
                    const returnedAjaxData = JSON.parse(xmlhttp.responseText);
                    resolve(returnedAjaxData);
                } else {
                    reject({ responseCode: xmlhttp.status, message: xmlhttp.responseText });
                }
            };

            xmlhttp.onerror = () => reject({ responseCode: xmlhttp.status, message: xmlhttp.responseText });
            xmlhttp.ontimeout = () => reject({ responseCode: xmlhttp.status, message: xmlhttp.responseText });
            // Content-Type,Cache-Control,Authorization,auth
            xmlhttp.setRequestHeader("Accept", "application/json");
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            xmlhttp.send();
        });
    }
}
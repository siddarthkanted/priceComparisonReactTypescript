// tslint:disable-next-line:no-namespace
export namespace Utils {
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
}
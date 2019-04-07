import * as React from "react";
import * as sitemap from "sitemap";
import { Utils } from 'src/common/Utils';
import { PartnerDictionary } from 'src/constants/Constants';
import { RouteList } from 'src/constants/Routes';
import { StringConstant } from 'src/constants/StringConstant';

export class Sitemap extends React.Component<any, any> {
    public componentDidMount(): void {
        document.title = "Sitemap";
    }

    public render(): string {
        const urls: string[] = [];
        urls.push(...RouteList.map(route =>  Utils.getUrl(route.name)));
        urls.push(...Object.keys(PartnerDictionary).map(key =>  Utils.getUrl(StringConstant.partner, key)));
        urls.push(...StringConstant.offerVariableNameList.map(offer =>  Utils.getUrl(StringConstant.offer, offer)));
        const sitemapObj = sitemap.createSitemap({
            hostname: 'https://pricecomparison-6d140.firebaseapp.com/',
            urls
        });
        return sitemapObj.toString();
    }
}
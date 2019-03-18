import * as React from "react";
import * as sitemap from "sitemap";
import { Utils } from 'src/common/Utils';
import { CategoryList } from 'src/constants/Offers';
import { routeList } from 'src/constants/Routes';
import { CategoryUtils } from 'src/model/Category';

export class Sitemap extends React.Component<any, any> {
    public componentDidMount(): void {
        document.title = "Sitemap";
    }

    public render(): string {
        const urls: string[] = [];
        urls.push(...routeList.map(route =>  Utils.getUrl(route.name)));
        urls.push(...CategoryList.map(category =>  CategoryUtils.getUrl(category.titleOptionType)));
        const sitemapObj = sitemap.createSitemap({
            hostname: 'https://pricecomparison-6d140.firebaseapp.com/',
            urls
        });
        return sitemapObj.toString();
    }
}
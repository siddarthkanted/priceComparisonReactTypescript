import * as React from "react";
import * as sitemap from "sitemap";
import { Utils } from 'src/common/Utils';
import { CategoryList } from 'src/constants/Offers';
import { routeList } from 'src/constants/Routes';
import { CategoryUtils } from '../../model/Category';

export class Sitemap extends React.Component<any, any> {
    public componentDidMount(): void {
        document.title = "Sitemap";
    }

    public render(): JSX.Element {
        const urls = [
            ...CategoryList.map(category => CategoryUtils.getUrlWithoutHost(category.titleOptionType)),
            ...routeList.map(route => Utils.getUrlWithoutHost(route.name))
        ];
        return (
            <>
                {this.sitemap(urls)}
            </>
        );
    }

    private sitemap(urls: string[]): string {
        const sitemapObj = sitemap.createSitemap({
            hostname: Utils.getBaseUrl(),
            urls: [
                { url: '/' },
                ...urls.map(url => ({url: '/'+url}))
            ]
        });
        return sitemapObj.toString();
    }
}
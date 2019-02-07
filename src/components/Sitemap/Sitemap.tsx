import { Link } from 'office-ui-fabric-react';
import * as React from "react";
import { Utils } from 'src/common/Utils';
import { CategoryList } from 'src/constants/Offers';
import { routeList } from 'src/constants/Routes';
import { CategoryUtils, ICategory } from '../../model/Category';
import { IRoute, OptionTypeUtils } from '../../model/Model';

export class Sitemap extends React.Component<any, any> {
    public componentDidMount(): void {
        document.title = "Sitemap";
    }

    public render(): JSX.Element {
        return (
            <ol>
                {routeList.map(route => this.renderRoute(route))}
                {CategoryList.map(category => this.renderCategory(category))}
            </ol>
        );
    }

    private renderCategory(category: ICategory): JSX.Element {
        const href = CategoryUtils.getUrl(category.titleOptionType);
        const label = OptionTypeUtils.getLabel(category.titleOptionType);
        return <li><Link href={href}>{label}</Link></li>
    }

    private renderRoute(route: IRoute): JSX.Element {
        const href = Utils.getUrl(route.name)
        return <li><Link href={href}>{route.name}</Link></li>
    }
}
import { Link } from 'office-ui-fabric-react';
import * as React from "react";
import { Utils } from 'src/common/Utils';
import { CategoryList } from 'src/constants/Offers';
import { routeList } from 'src/constants/Routes';
import { IRoute, OptionTypeUtils } from '../../common/Model';
import { CategoryUtils, ICategory } from '../../model/Category';

export class Sitemap extends React.Component<any, any> {
    public componentDidMount(): void {
        document.title = "Sitemap";
    }

    public render(): JSX.Element {
        return (
            <>
                {routeList.map(route => this.renderRoute(route))}
                {CategoryList.map(category => this.renderCategory(category))}
            </>
        );
    }

    private renderCategory(category: ICategory): JSX.Element {
        const href = CategoryUtils.getUrl(category.titleOptionType);
        const label = OptionTypeUtils.getLabel(category.titleOptionType);
        return <Link href={href}>{label}</Link>
    }

    private renderRoute(route: IRoute): JSX.Element {
        const href = Utils.getUrl(route.name)
        return <Link href={href}>{route.name}</Link>
    }
}
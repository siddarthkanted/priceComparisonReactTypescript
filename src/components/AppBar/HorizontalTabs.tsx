import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { Utils } from 'src/common/Utils';
import { RouteDictionary, RouteList } from "src/constants/Routes";
import { IRoute } from 'src/model/Model';
import './HorizontalTabs.css';

interface IHorizontalTabsProps {
    activeTabName: string;
    urlParams: any;
}

export class HorizontalTabs extends React.Component<IHorizontalTabsProps> {
    public render(): JSX.Element {
        const activeRoute = RouteDictionary[this.props.activeTabName];
        return (
            <>
                <AppBar>
                    <Tabs value={this.props.activeTabName} onChange={this.onTabClick}>
                        {RouteList.map(this.renderTab)}
                    </Tabs>
                </AppBar>
                <div className="body">
                    {this.renderComponent(activeRoute.component, this.props.urlParams, activeRoute.extraProps)}
                </div>
            </>
        );
    }

    @autobind
    private renderTab(route: IRoute): JSX.Element {
        return <Tab label={route.name} key={route.name} value={route.name} />;
    }

    private renderComponent(Component: React.ComponentClass, props: any, extraProps?: _.Dictionary<any>): JSX.Element {
        return (
            <Component
                {...props}
                {...extraProps}
            />);
    }

    private onTabClick(event: React.ChangeEvent<{}>, value: string): void {
        if (value) {
            Utils.setUrlPath(value);
          }
    }
}
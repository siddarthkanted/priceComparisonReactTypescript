import { initializeIcons } from '@uifabric/icons';
import { Link } from 'office-ui-fabric-react';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { Utils } from "src/common/Utils";
import { routeList } from "src/constants/Routes";
import { IRoute } from 'src/model/Model';
import './App.css';
import { Sitemap } from './components/Sitemap/Sitemap';

initializeIcons();

class App extends React.Component<any, any> {
  public render() {
    return (
      <>
        <Switch>
          {routeList.map(route => this.renderRoute(route))}
          {<Route path="/sitemap" render={(props) => this.renderComponent(Sitemap, props)} key={"Sitemap"} />}
          {this.renderRoute(Object.assign({}, routeList[0], { path: "" }))}
        </Switch>
        <Link href={Utils.getUrl("sitemap")} className={"visibilityHidden"}>{"Sitemap"}</Link>
      </>
    );
  }

  private renderRoute(route: IRoute): JSX.Element {
    const path = "/" + (route.path === undefined ? route.name : route.path);
    return <Route path={path} render={(props) => this.renderPivot(route, props)} key={path} />
  }

  private renderPivot(selectedRoute: IRoute, props: any): JSX.Element {
    return (
      <Pivot linkFormat={PivotLinkFormat.tabs} selectedKey={selectedRoute.name} onLinkClick={this.onPivotItemClick}>
        {routeList.map(pathItem => this.renderPivotItem(pathItem, selectedRoute.name, props))}
      </Pivot>
    );
  }

  private renderPivotItem(route: IRoute, selectedRouteName: string, props: any): JSX.Element {
    return (
      <PivotItem linkText={route.name} itemKey={route.name} key={route.name} className={route.className}>
        {selectedRouteName === route.name && this.renderComponent(route.component, props, route.extraProps)}
      </PivotItem>
    );
  }

  private renderComponent(Component: React.ComponentClass, props: any, extraProps?: _.Dictionary<any>): JSX.Element {
    return (
      <Component
        {...props}
        {...extraProps}
      />);
  }

  private onPivotItemClick(item: PivotItem): void {
    if (item.props.itemKey) {
      Utils.setUrlPath(item.props.itemKey);
    }
  }
}

export default App;
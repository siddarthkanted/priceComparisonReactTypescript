import { initializeIcons } from '@uifabric/icons';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { HorizontalTabs } from 'src/components/AppBar/HorizontalTabs';
import { Sitemap } from 'src/components/Sitemap/Sitemap';
import { RouteList } from "src/constants/Routes";
import { IRoute } from 'src/model/Model';
import './App.css';

initializeIcons();

class App extends React.Component<any, any> {
  public render() {
    return (
      <Switch>
        {RouteList.map(route => this.renderRoute(route))}
        {<Route path="/sitemapcomponent" render={(props) => this.renderComponent(Sitemap, props)} key={"sitemapcomponent"} />}
        {this.renderRoute(Object.assign({}, RouteList[0], { path: "" }))}
      </Switch>
    );
  }

  private renderRoute(route: IRoute): JSX.Element {
    const path = "/" + (route.path === undefined ? route.name : route.path);
    return <Route key={route.name} path={path} render={(props) => <HorizontalTabs activeTabName={route.name} urlParams={props} />} />
  }

  private renderComponent(Component: React.ComponentClass, props: any, extraProps?: _.Dictionary<any>): JSX.Element {
    return (
      <Component
        {...props}
        {...extraProps}
      />);
  }
}

export default App;
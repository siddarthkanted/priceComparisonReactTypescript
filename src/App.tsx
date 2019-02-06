import { initializeIcons } from '@uifabric/icons';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { IRoute } from 'src/common/Model';
import { Utils } from "src/common/Utils";
import { Offers } from 'src/components/Offers/Offers';
import { GroceryMain } from 'src/components/Product/GroceryMain';
import { Travel } from "src/components/Travel/Travel";
import { BuyLinks, OfferLinks, TravelOptions } from "src/constants/Constants";
import './App.css';

initializeIcons();



class App extends React.Component<any, any> {
  private routeList: IRoute[] = [
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.flight,
        ["offerLinks"]: OfferLinks.flightOffers,
        ["options"]: TravelOptions.flightOptions,
        ["title"]: "Flights Multiple URL Opener",
      },
      name: "Flight"
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.train,
        ["offerLinks"]: OfferLinks.trainOffers,
        ["options"]: TravelOptions.trainOptions,
        ["title"]: "Train Multiple URL Opener",
      },
      name: "Train"
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.bus,
        ["offerLinks"]: OfferLinks.busOffers,
        ["options"]: TravelOptions.busOptions,
        ["title"]: "Bus Multiple URL Opener",
      },
      name: "Bus"
    },
    {
      className: "groceryMain",
      component: GroceryMain,
      name: "Grocery",
      path: "Grocery/:parentCategory?/:childCategory?"
    },
    {
      component: Offers,
      name: "Offers",
      path: "Offers/:displayCategoryString?"
    }
  ];


  public render() {
    return (
      <Switch>
        {this.routeList.map(route => this.renderRoute(route))}
        {this.renderRoute(Object.assign({}, this.routeList[0], { path: "" }))}
      </Switch>
    );
  }

  private renderRoute(route: IRoute): JSX.Element {
    const path = "/" + (route.path === undefined ? route.name : route.path);
    return <Route path={path} render={(props) => this.renderPivot(route, props)} key={path} />
  }

  private renderPivot(selectedRoute: IRoute, props: any): JSX.Element {
    return (
      <Pivot linkFormat={PivotLinkFormat.tabs} selectedKey={selectedRoute.name} onLinkClick={this.onPivotItemClick}>
        {this.routeList.map(pathItem => this.renderPivotItem(pathItem, selectedRoute.name, props))}
      </Pivot>
    );
  }

  private renderPivotItem(route: IRoute, selectedRouteName: string, props: any): JSX.Element {
    return (
      <PivotItem linkText={route.name} itemKey={route.name} key={route.name} className={route.className}>
        {selectedRouteName === route.name && this.renderComponent(route, props)}
      </PivotItem>
    );
  }

  private renderComponent(route: IRoute, props: any): JSX.Element {
    const Component = route.component as React.ComponentClass;
    return (
      <Component
        {...props}
        {...route.extraProps}
      />);
  }

  private onPivotItemClick(item: PivotItem): void {
    if (item.props.itemKey) {
      window.location.href = Utils.getUrl(item.props.itemKey);
    }
  }
}

export default App;
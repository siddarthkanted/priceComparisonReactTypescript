import { initializeIcons } from '@uifabric/icons';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { IRoutePath, ITravelRoutePath } from 'src/common/Model';
import { Utils } from "src/common/Utils";
import { Offers } from 'src/components/Offers/Offers';
import { GroceryMain } from 'src/components/Product/GroceryMain';
import { Travel } from "src/components/Travel/Travel";
import { BuyLinks, OfferLinks, TravelOptions } from "src/constants/Constants";
import './App.css';

initializeIcons();



class App extends React.Component<any, any> {
  private travelList: ITravelRoutePath[] = [
    {
      links: BuyLinks.flight,
      offerLinks: OfferLinks.flightOffers,
      options: TravelOptions.flightOptions,
      path: "Flight",
      render: this.renderGenericTravel,
      title: "Flights Multiple URL Opener"
    },
    {

      links: BuyLinks.train,
      offerLinks: OfferLinks.trainOffers,
      options: TravelOptions.trainOptions,
      path: "Train",
      render: this.renderGenericTravel,
      title: "Train Multiple URL Opener"
    },
    {
      links: BuyLinks.bus,
      offerLinks: OfferLinks.busOffers,
      options: TravelOptions.busOptions,
      path: "Bus",
      render: this.renderGenericTravel,
      title: "Bus Multiple URL Opener"
    },
  ];

  private pathList: IRoutePath[] = [
    ...this.travelList,
    { path: "Grocery/:parentCategory?/:childCategory?", component: GroceryMain, name: "Grocery", className: "groceryMain"  },
    { path: "Offers/:displayCategoryString?", component: Offers, name: "Offers" },
  ];

  public render() {
    return (
      <Switch>
        {this.pathList.map(path => this.renderRoute(path))}
        {this.renderRoute(Object.assign({}, this.travelList[0], { path: "" }))}
      </Switch>
    );
  }

  private renderRoute(path: IRoutePath): JSX.Element {
    return <Route path={"/" + path.path} render={(props) => this.renderPivot(path, props)} key={path.path} />
  }

  private renderPivotItem(path: IRoutePath, props: any): JSX.Element {
    const pathName = this.getPathName(path);
    return (
      <PivotItem linkText={pathName} itemKey={pathName} key={pathName} className={path.className}>
        {path.render && path.render(path)}
        {path.component && this.renderGeneric(path.component, props)}
      </PivotItem>
    );
  }

  private renderPivot(selectedPath: IRoutePath, props: any): JSX.Element {
    const pathName = this.getPathName(selectedPath);
    return (
      <Pivot linkFormat={PivotLinkFormat.tabs} selectedKey={pathName} onLinkClick={this.onPivotItemClick}>
        {this.pathList.map(pathItem => this.renderPivotItem(pathItem, props))}
      </Pivot>
    );
  }

  private renderGeneric(Component: React.ComponentClass, props: any): JSX.Element {
    return (
      <Component 
        {...props}
      />);
  }
  
  private renderGenericTravel(path: IRoutePath): JSX.Element {
    const travel = path as ITravelRoutePath;
    return (
      <Travel
        links={travel.links}
        options={travel.options}
        title={travel.title}
        offerLinks={travel.offerLinks}
      />);
  }

  private onPivotItemClick(item: PivotItem): void {
    if (item.props.itemKey) {
      window.location.href = Utils.getUrl(item.props.itemKey);
    }
  }

  private getPathName(path: IRoutePath): string {
    return path.name ? path.name : path.path;
  }
}

export default App;
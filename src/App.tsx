import { initializeIcons } from '@uifabric/icons';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { BuyLinks, OfferLinks, TravelOptions } from "src/common/Constants";
import { Utils } from "src/common/Utils";
import { Offers } from 'src/components/Offers/Offers';
import { GroceryMain } from 'src/components/Product/GroceryMain';
import { Generic, IGenericProps } from "src/components/Travel/Generic";
import './App.css';

initializeIcons();

interface IPath {
  path: string;
  name?: string;
  component?: React.ComponentClass;
  render?: (path: IPath) => JSX.Element;
  className?: string;
}

interface ITravel extends IPath, IGenericProps {
}

class App extends React.Component<any, any> {
  private travelList: ITravel[] = [
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

  private pathList: IPath[] = [
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

  private renderRoute(path: IPath): JSX.Element {
    return <Route path={"/" + path.path} render={(props) => this.renderPivot(path, props)} key={path.path} />
  }

  private renderPivotItem(path: IPath, props: any): JSX.Element {
    const pathName = this.getPathName(path);
    return (
      <PivotItem linkText={pathName} itemKey={pathName} key={pathName} className={path.className}>
        {path.render && path.render(path)}
        {path.component && this.renderGeneric(path.component, props)}
      </PivotItem>
    );
  }

  private renderPivot(selectedPath: IPath, props: any): JSX.Element {
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
  
  private renderGenericTravel(path: IPath): JSX.Element {
    const travel = path as ITravel;
    return (
      <Generic
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

  private getPathName(path: IPath): string {
    return path.name ? path.name : path.path;
  }
}

export default App;
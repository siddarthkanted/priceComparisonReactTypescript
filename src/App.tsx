import { initializeIcons } from '@uifabric/icons';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { IRoutePath } from 'src/common/Model';
import { Utils } from "src/common/Utils";
import { Offers } from 'src/components/Offers/Offers';
import { GroceryMain } from 'src/components/Product/GroceryMain';
import { Travel } from "src/components/Travel/Travel";
import { BuyLinks, OfferLinks, TravelOptions } from "src/constants/Constants";
import './App.css';

initializeIcons();



class App extends React.Component<any, any> {
  private routePathList: IRoutePath[] = [
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.flight,
        ["offerLinks"]: OfferLinks.flightOffers,
        ["options"]: TravelOptions.flightOptions,
        ["title"]: "Flights Multiple URL Opener",
      },
      name: "Flight",
      path: "Flight",
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.train,
        ["offerLinks"]: OfferLinks.trainOffers,
        ["options"]: TravelOptions.trainOptions,
        ["title"]: "Train Multiple URL Opener",
      },
      name: "Train",
      path: "Train",
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.bus,
        ["offerLinks"]: OfferLinks.busOffers,
        ["options"]: TravelOptions.busOptions,
        ["title"]: "Bus Multiple URL Opener",
      },
      name: "Bus",
      path: "Bus",
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
        {this.routePathList.map(path => this.renderRoute(path))}
        {this.renderRoute(Object.assign({}, this.routePathList[0], { path: "" }))}
      </Switch>
    );
  }

  private renderRoute(path: IRoutePath): JSX.Element {
    return <Route path={"/" + path.path} render={(props) => this.renderPivot(path, props)} key={path.path} />
  }

  private renderPivot(selectedPath: IRoutePath, props: any): JSX.Element {
    const selectedPathName = this.getPathName(selectedPath);
    return (
      <Pivot linkFormat={PivotLinkFormat.tabs} selectedKey={selectedPathName} onLinkClick={this.onPivotItemClick}>
        {this.routePathList.map(pathItem => this.renderPivotItem(pathItem, selectedPathName, props))}
      </Pivot>
    );
  }
  
  private renderPivotItem(path: IRoutePath, selectedPathName: string, props: any): JSX.Element {
    const pathName = this.getPathName(path);
    return (
      <PivotItem linkText={pathName} itemKey={pathName} key={pathName} className={path.className}>
        {selectedPathName === pathName && this.renderComponent(path, props)}
      </PivotItem>
    );
  }

  private renderComponent(path: IRoutePath, props: any): JSX.Element {
    const Component = path.component as React.ComponentClass;
    return (
      <Component
        {...props}
        {...path.extraProps}
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
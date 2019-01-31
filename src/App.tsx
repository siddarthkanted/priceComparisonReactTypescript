import { initializeIcons } from '@uifabric/icons';
import { Pivot, PivotItem, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { Bus, Flight, Train, TravelOptions } from "src/components/Common/Constants";
import { AllOffers } from "src/components/Common/Constants";
import { Offers } from 'src/components/Common/Offers';
import { Utils } from "src/components/Common/Utils";
import { GroceryMain } from "src/components/Product/GroceryMain";
import { Generic, IGenericProps } from "src/components/Travel/Generic";
import './App.css';

initializeIcons();

interface IPath {
  path: string;
  render: (path: IPath) => JSX.Element;
  className?: string;
}

interface ITravel extends IPath, IGenericProps {
}

class App extends React.Component<any, any> {
  private travelList: ITravel[] = [
    {
      links: Flight.flightLinks,
      offerLinks: AllOffers.flightOffers,
      options: TravelOptions.flightOptions,
      path: "Flight", 
      render: this.renderGeneric, 
      title: "Flights Multiple URL Opener"
    },
    {
      links: Train.trainLinks,
      offerLinks: AllOffers.trainOffers,
      options: TravelOptions.trainOptions,
      path: "Train", 
      render: this.renderGeneric, 
      title: "Train Multiple URL Opener"
    },
    {
      links: Bus.busLinks,
      offerLinks: AllOffers.busOffers,
      options: TravelOptions.busOptions,
      path: "Bus", 
      render: this.renderGeneric, 
      title: "Bus Multiple URL Opener",
      variedLinks: Bus.busLinksWithVariation
    },
  ];
  private pathList: IPath[]  = [
    ...this.travelList,
    { path: "Grocery", render: (path: IPath) => <GroceryMain />, className: "groceryMain" },
    { path: "Offers", render: (path: IPath) => <Offers />},
  ];

  public render() {
    return (
      <Switch>
        {this.pathList.map(path => this.renderRoute(path))}
        {this.renderRoute(Object.assign({}, this.travelList[0], {path: ""}))}
      </Switch>
    );
  }

  private renderRoute(path: IPath): JSX.Element {
    return <Route path={"/" + path.path} render={(props) => this.renderPivot(path)} key={path.path} />
  }

  private renderPivotItem(path: IPath): JSX.Element {
    return (
      <PivotItem linkText={path.path} itemKey={path.path} key={path.path} className={path.className}>
        {path.render(path)}
      </PivotItem>
    );
  }

  private renderPivot(selectedPath: IPath): JSX.Element {
    return (
      <Pivot linkFormat={PivotLinkFormat.tabs} selectedKey={selectedPath.path} onLinkClick={this.onPivotItemClick}>
        {this.pathList.map(pathItem => this.renderPivotItem(pathItem))}
      </Pivot>
    );
  }

  private renderGeneric(path: IPath): JSX.Element {
    const travel = path as ITravel;
    return (
      <Generic
        links={travel.variedLinks ? Object.keys(travel.variedLinks).concat(travel.links) : travel.links}
        options={travel.options}
        title={travel.title}
        offerLinks={travel.offerLinks}
        variedLinks={travel.variedLinks}
      />);
  }

  private onPivotItemClick(item: PivotItem): void {
    if (item.props.itemKey) {
      window.open(Utils.getUrl(item.props.itemKey), "_self");
    }
  }
}

export default App;
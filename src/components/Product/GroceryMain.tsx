import { initializeIcons } from '@uifabric/icons';
import * as Firebase from 'firebase';
import { autobind } from "office-ui-fabric-react";
import * as React from 'react';
import { Route, Switch } from "react-router";
import { MultipleProduct } from 'src/components/Product/MultipleProduct';
import { SingleProduct } from "src/components/Product/SingleProduct";
import { VerticalNavigationBar } from "src/components/VerticalNavigationBar/VerticalNavigationBar";

initializeIcons();

interface IGroceryMain {
  isSuccess: boolean;
  dataList?: any;
}

export class GroceryMain extends React.Component<any, IGroceryMain> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataList: undefined,
      isSuccess: false
    }
  }

  public componentWillMount(): void {
    const config = {
      apiKey: "AIzaSyDzwmSykRFIMFBy5JZkQmIcu5QZswwveGw",
      authDomain: "pricecomparison-6d140.firebaseapp.com",
      databaseURL: "https://pricecomparison-6d140.firebaseio.com",
      messagingSenderId: "233265084251",
      projectId: "pricecomparison-6d140",
      storageBucket: "pricecomparison-6d140.appspot.com"
    };
    Firebase.initializeApp(config);
    if (!this.state.dataList) {
      this.readAllData();
    }
  }

  public render() {
    if (this.state.dataList) {
      return (
        <>
          <VerticalNavigationBar dataList={this.state.dataList} />
            <Switch>
              <Route path="/product/:productName" render={this.renderSingleProduct} />
              <Route path="/category/:parentCategory?/:childCategory?" render={this.renderCategory}  />)} />
              <Route path="/" render={this.renderCategory}  />)} />
            </Switch>
        </>
      );
    }
    return <div>nothing found</div>
  }

  @autobind
  private renderSingleProduct(props: any): JSX.Element {
    return (
      <SingleProduct 
        dataList={this.state.dataList}
        {...props}
      />);
  }

  @autobind
  private renderCategory(props: any): JSX.Element {
    return (
      <MultipleProduct 
        dataList={this.state.dataList}
        {...props}
      />);
  }

  @autobind
  private readAllData(): void {
    Firebase.database().ref().once('value').then(x => this.setAppSate(x.val(), true), (x => this.setAppSate(undefined, false)));
  }

  @autobind
  private setAppSate(dataList: any, isSuccess: boolean): void {
    this.setState({ dataList, isSuccess });
  }
}

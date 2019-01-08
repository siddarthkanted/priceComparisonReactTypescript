import * as Firebase from 'firebase';
import { autobind } from "office-ui-fabric-react";
import * as React from 'react';
import './App.css';
import { VerticalNavigationBar } from "./components/VerticalNavigationBar/VerticalNavigationBar";

interface IAppState {
  isSuccess: boolean;
  dataList?: any;
}

class App extends React.Component<any, IAppState> {
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
          {this.state.dataList.map(x => this.renderData(x))}
        </>
      );
    }
    return <div>nothing found</div>
  }

  private renderData(data: any): JSX.Element {
    return (
      <>
        <div>{data.Name}</div>
        {data.Category.map(x => this.renderValue(x))}
        {data.Link.map(x => this.renderValue(x))}
        {data.Images.map(x => this.renderImage(x))}
      </>
    );
  }

  private renderValue(value: string): JSX.Element {
    return (
      <div>{value}</div>
    );
  }

  private renderImage(link: string): JSX.Element {
    return <img src={link} />
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

export default App;

import * as Firebase from 'firebase';
import { autobind } from "office-ui-fabric-react";
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { Utils } from "src/common/Utils";
import 'src/components/Product/Product.css';
import { ProductCard } from "src/components/Product/ProductCard";
import { VerticalNavigationBar } from "src/components/VerticalNavigationBar/VerticalNavigationBar";

interface IUrlParams {
  parentCategory?: string;
  childCategory?: string;
}

interface IGroceryMainState {
  dataList?: any;
}

interface IGroceryMainProps extends RouteComponentProps<IUrlParams> { }

export class GroceryMain extends React.Component<IGroceryMainProps, IGroceryMainState> {
  constructor(props: IGroceryMainProps) {
    super(props);
    this.state = {
      dataList: undefined
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

  public render(): JSX.Element {
    const { dataList } = this.state;
    if (dataList) {
      return (
        <>
          <VerticalNavigationBar dataList={dataList} />
          <div className={"multipleProductDataList"}>
            {this.renderProductCards()}
          </div>
        </>
      );
    } else {
      return (<div>nothing found</div>);
    }
  }

  private renderProductCards(): JSX.Element {
    const { parentCategory, childCategory } = this.props.match.params;
    const { dataList } = this.state;
    if (parentCategory || childCategory) {
      return this.getFilteredDataList(dataList).map((data, index) => <ProductCard data={data} key={index} />);
    }
    return dataList.map((data, index) => <ProductCard data={data} key={index} />);
  }

  @autobind
  private readAllData(): void {
    Firebase.database().ref().once('value').then(x => this.setAppSate(x.val(), true), (x => this.setAppSate(undefined, false)));
  }

  @autobind
  private setAppSate(dataList: any, isSuccess: boolean): void {
    if (isSuccess) {
      this.setState({ dataList });
      document.title = this.getDocumentTitle(dataList);
    }
  }

  private getFilteredDataList(dataList: any): any {
    const filteredDataList: any[] = []
    const { parentCategory, childCategory } = this.props.match.params;
    if (parentCategory) {
      filteredDataList.push(...dataList.filter(
        data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(parentCategory) >= 0));
    }
    if (childCategory) {
      return filteredDataList.filter(
        data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(childCategory) >= 0);
    }
    return filteredDataList;
  }

  @autobind
  private getDocumentTitle(dataList: any): string {
    let title = "Price Comaprison";
    const { parentCategory, childCategory } = this.props.match.params;
    if (dataList && parentCategory) {
      title = this.state.dataList[0].Category[0];
    }
    if (dataList && childCategory) {
      title = this.state.dataList[0].Category[0] + "-" + this.state.dataList[0].Category[1];
    }
    return title;
  }
}

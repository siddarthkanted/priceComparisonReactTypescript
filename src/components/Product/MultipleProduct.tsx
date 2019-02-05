import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Utils } from "src/common/Utils";
import { ProductCard } from "src/components/Product/ProductCard";
import './Product.css';

interface IUrlParams {
    parentCategory?: string;
    childCategory?: string;
}

interface IMultipleProductProps extends RouteComponentProps<IUrlParams> {
    dataList: any;
}

interface IMultipleProductState {
    dataList: any;
}

export class MultipleProduct extends React.Component<IMultipleProductProps, IMultipleProductState> {
    constructor(props: IMultipleProductProps) {
        super(props);
        this.state = {
            dataList: null
        };
    }

    public componentWillMount(): void {
        const dataList = this.filterDataList();
        this.setState({ dataList });
    }

    public componentDidMount(): void {
        document.title = "Price Comaprison";
        const { parentCategory, childCategory } = this.props.match.params;
        if (parentCategory) {
            document.title = this.state.dataList[0].Category[0];
        }
        if (childCategory) {
            document.title = this.state.dataList[0].Category[0] + "-" + this.state.dataList[0].Category[1];
        }
    }

    public render() {
        return (
            <div className={"multipleProductDataList"}>
                {this.filterDataList().map((data, index) => <ProductCard data={data} key={index} />)}
            </div>
        );
    }

    private filterDataList(): any {
        let { dataList } = this.props;
        const { parentCategory, childCategory } = this.props.match.params;
        if (parentCategory) {
            dataList = dataList.filter(
                data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(parentCategory) >= 0);
        }
        if (childCategory) {
            dataList = dataList.filter(
                data => data.Category.map(x => Utils.convertToSlug(x)).indexOf(childCategory) >= 0);
        }
        return dataList;
    }

}


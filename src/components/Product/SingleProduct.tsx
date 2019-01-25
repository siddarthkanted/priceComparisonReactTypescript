import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ProductCard } from "src/components/Product/ProductCard";
import { Utils } from "src/Utils";

interface IUrlParams {
    productName: string;
}

interface ISingleProductProps extends RouteComponentProps<IUrlParams> {
    dataList: any;
}

interface ISingleProductState {
    data: any;
}

export class SingleProduct extends React.Component<ISingleProductProps, ISingleProductState> {
    constructor(props: ISingleProductProps) {
        super(props);
        this.state = {
            data: null
        };
    }

    public componentWillMount(): void {
        const { dataList } = this.props;
        const { productName } = this.props.match.params;
        const data = dataList.filter(x => Utils.convertToSlug(x.Name) === productName)[0];
        this.setState({ data });
    }

    public componentDidMount(): void {
        document.title = this.state.data.Name;
    }

    public render(): JSX.Element {
        return (
            <ProductCard data={this.state.data} />
        )
    }
};
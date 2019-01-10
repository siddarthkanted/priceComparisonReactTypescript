import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Utils } from "src/Utils";

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
        this.setState({dataList});
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
        const dataList = this.filterDataList();
        return (
            dataList.map((data, index) => this.renderCard(data, index))
        );
    }

    private renderCard(data: any, index: number): JSX.Element {
        const url = Utils.getUrl("product", data.Name);
        return (
            <a key={index} href={url}>
                <Image
                    src={data.Images[0]}
                    alt={data.Name}
                />
                <Label>
                    {data.Name}
                </Label>
            </a>
        )
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


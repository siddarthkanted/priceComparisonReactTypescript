import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Utils } from "src/Utils";

interface IUrlParams {
    productName: string;
}

interface ISingleProductProps extends RouteComponentProps<IUrlParams> {
    // tslint:disable:react-unused-props-and-state
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
        this.setState({data});
    }

    public componentDidMount(): void {
        document.title = this.state.data.Name;
    }

    public render(): JSX.Element {
        const {data} = this.state;
        return (
            <>
                <Breadcrumb
                    items={[
                        this.createBreadcrumbItem(data.Category[0], data.Category[0]),
                        this.createBreadcrumbItem(data.Category[1], data.Category[0], data.Category[1])
                    ]}
                    ariaLabel={'Category of ' + data.Name}
                />
                <Label>
                    {data.Name}
                </Label>
                <Image
                    src={data.Images[0]}
                    alt={data.Name}
                />
                {data.Link.map(x => this.renderLink(x))}
            </>
        )
    }

    private renderLink(link: string): JSX.Element {
        const hostName = Utils.getHostNameFromUrl(link);
        return (
            <div>
                <span>{hostName}</span>
                <Link href={link}>Buy from {hostName}</Link>
            </div>
        );
    }

    private createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
        return {
            href: Utils.getUrl("category", ...urlPart),
            key: category,
            text: category,
        };
    }
};



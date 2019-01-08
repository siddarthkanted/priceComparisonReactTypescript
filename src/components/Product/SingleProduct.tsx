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

export const SingleProduct: React.SFC<ISingleProductProps> = (props: ISingleProductProps) => {
    const { dataList } = props;
    const { productName } = props.match.params;
    const data = dataList.filter(x => Utils.convertToSlug(x.Name) === productName)[0];
    return renderData(data);
};

function renderData(data: any): JSX.Element {
    return (
        <>
            <Breadcrumb
                items={[
                    createBreadcrumbItem(data.Category[0], data.Category[0]),
                    createBreadcrumbItem(data.Category[1], data.Category[0], data.Category[1])
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
            {data.Link.map(x => renderLink(x))}    
        </>
    )
}

function renderLink(link: string): JSX.Element {
    const hostName = Utils.getHostNameFromUrl(link);
    return (
        <div>
            <span>{hostName}</span>
            <Link href={link}>Buy from {hostName}</Link>
        </div>
    );
}

function createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
    return {
        href: Utils.getUrl("category", ...urlPart),
        key: category,
        text: category,
    };
}

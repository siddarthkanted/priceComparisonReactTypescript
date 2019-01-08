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
    // tslint:disable:react-unused-props-and-state
    dataList: any;

}

export const MultipleProduct: React.SFC<IMultipleProductProps> = (props: IMultipleProductProps) => {
    const dataList = filterDataList(props);
    return (
        dataList.map((data, index) => renderCard(data, index))
    );
}

function renderCard(data: any, index: number): JSX.Element {
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

function filterDataList(props: IMultipleProductProps): any {
    let { dataList } = props;
    const { parentCategory, childCategory } = props.match.params;
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
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import {
    DocumentCard,
    DocumentCardPreview,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import * as React from "react";
import { MultipleUrlOpener } from "src/components/Common/MultipleUrlOpener";
import { Utils } from "src/components/Common/Utils";
import './Product.css';

interface IProductCardProps {
    data: any;
}

export class ProductCard extends React.Component<IProductCardProps> {
    public render(): JSX.Element {
        const { data } = this.props;
        const previewProps: IDocumentCardPreviewProps = Utils.getIDocumentCardPreviewProps(data.Images);
        return (
            <DocumentCard className={"documentCard"}>
                <Breadcrumb
                    items={[
                        this.createBreadcrumbItem(data.Category[0], data.Category[0]),
                        this.createBreadcrumbItem(data.Category[1], data.Category[0], data.Category[1])
                    ]}
                    ariaLabel={'Category of ' + data.Name}
                />
                <h3>{data.Name}</h3>
                <MultipleUrlOpener
                    getLinks={() => data.Link}
                />
                <DocumentCardPreview {...previewProps} />
            </DocumentCard>
        )
    }

    private createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
        return {
            href: Utils.getUrl("Grocery", "category", ...urlPart),
            key: category,
            text: category,
        };
    }
};
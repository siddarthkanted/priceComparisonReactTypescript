import { autobind } from '@uifabric/utilities';
import produce from "immer";
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import {
    DocumentCard,
    DocumentCardPreview,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import * as React from "react";
import { IAffiliateLink } from 'src/common/Model';
import { Utils } from "src/common/Utils";
import { AffiliateMultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';
import { BuyLinks } from 'src/constants/Constants';
import './Product.css';

interface IProductCardProps {
    data: any;
}

export class ProductCard extends React.Component<IProductCardProps> {
    public render(): JSX.Element {
        const { data } = this.props;
        const previewProps: IDocumentCardPreviewProps = Utils.getIDocumentCardPreviewProps(data.Images);
        return (
            <DocumentCard>
                {data.Category && data.Category.length > 0 && this.renderBreadCrumb()}
                <h3>{data.Name}</h3>
                {data.Link && <AffiliateMultipleUrlOpener
                    getLinks={this.getLinks}
                />}
                <DocumentCardPreview {...previewProps} />
            </DocumentCard>
        )
    }

    private renderBreadCrumb(): JSX.Element {
        const { data } = this.props;
        const breadCrumbItems: IBreadcrumbItem[] = [];
        if (data.Category[0]) {
            breadCrumbItems.push(this.createBreadcrumbItem(data.Category[0], data.Category[0]));
        }
        if (data.Category[1]) {
            breadCrumbItems.push(this.createBreadcrumbItem(data.Category[1], data.Category[0], data.Category[1]));
        }
        return (<Breadcrumb
            items={breadCrumbItems}
            ariaLabel={'Category of ' + data.Name}
        />)
    }

    @autobind
    private getLinks(): IAffiliateLink[] {
        const affilateLinks: IAffiliateLink[] = [];
        this.props.data.Link.forEach(link => {
            const affilateLink = BuyLinks.grocery.find(affilate => link.includes(affilate.name.toLowerCase()));
            if (affilateLink) {
                const clonedAffilateLink = produce(affilateLink, (clonedLink) => { clonedLink.link = link; });
                affilateLinks.push(clonedAffilateLink);
            } else {
                affilateLinks.push(Utils.createAffiliateLink(link));
            }

        });
        return affilateLinks;
    }

    private createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
        return {
            href: Utils.getUrl("Grocery", ...urlPart),
            key: category,
            text: category,
        };
    }
};
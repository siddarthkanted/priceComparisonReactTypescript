import { autobind } from '@uifabric/utilities';
import produce from "immer";
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import {
    DocumentCard,
    DocumentCardPreview,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import * as React from "react";
import { AffiliateMultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';
import { IAffiliateLink } from 'src/components/Common/Model';
import { Utils } from "src/components/Common/Utils";
import { BuyLinks } from '../Common/Constants';
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
                <Breadcrumb
                    items={[
                        this.createBreadcrumbItem(data.Category[0], data.Category[0]),
                        this.createBreadcrumbItem(data.Category[1], data.Category[0], data.Category[1])
                    ]}
                    ariaLabel={'Category of ' + data.Name}
                />
                <h3>{data.Name}</h3>
                <AffiliateMultipleUrlOpener
                    getLinks={this.getLinks}
                />
                <DocumentCardPreview {...previewProps} />
            </DocumentCard>
        )
    }

    @autobind
    private getLinks(): IAffiliateLink[] {
        const affilateLinks: IAffiliateLink[] = [];
        this.props.data.Link.forEach(link => {
            const affilateLink = BuyLinks.grocery.find(affilate => link.includes(affilate.name.toLowerCase()));
            if (affilateLink) {
                const clonedAffilateLink = produce(affilateLink, (clonedLink) => {clonedLink.link = link;});
                affilateLinks.push(clonedAffilateLink);
            } else {
                affilateLinks.push(Utils.createAffiliateLink(link));
            }
           
        });
        return affilateLinks;
    }

    private createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
        return {
            href: Utils.getUrl("Grocery", "category", ...urlPart),
            key: category,
            text: category,
        };
    }
};
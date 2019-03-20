import { autobind } from '@uifabric/utilities';
import produce from "immer";
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import {
    DocumentCard,
    DocumentCardPreview,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import * as React from "react";
import { Utils } from "src/common/Utils";
import { PartnerDictionary } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { AffiliateLinkUtils, IAffiliateLink } from 'src/model/AffiliateLink';
import { IGrocery } from 'src/model/Model';
import { MultipleUrlOpener } from '../AffiliateMultipleUrlOpener/MultipleUrlOpener';
import './Product.css';

interface IProductCardProps {
    data: IGrocery;
}

export class ProductCard extends React.Component<IProductCardProps> {
    public render(): JSX.Element {
        const { data } = this.props;
        const previewProps: IDocumentCardPreviewProps = Utils.getIDocumentCardPreviewProps(data.Images);
        return (
            <DocumentCard>
                {data.Category && data.Category.length > 0 && this.renderBreadCrumb()}
                <h3>{data.Name}</h3>
                {data.Link && <MultipleUrlOpener
                    title={"Buy now"}
                    partners={this.getLinks()}
                    variableNames={[StringConstant.groceryBooking]}
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
        const partners: IAffiliateLink[] = [];
        this.props.data.Link.forEach(link => {
            const partner = PartnerDictionary[Utils.getHostNameFromUrl(link)];
            if(partner) {
                const clonedPartner =  produce(partner, (clone) => { clone.groceryBooking = AffiliateLinkUtils.getAffiliatedLink(clone, link); });
                partners.push(clonedPartner);
            }
        });
        return partners;
    }

    private createBreadcrumbItem(category: string, ...urlPart: string[]): IBreadcrumbItem {
        return {
            key: category,
            onClick: () => Utils.setUrlPath("Grocery", ...urlPart),
            text: category
        };
    }
};
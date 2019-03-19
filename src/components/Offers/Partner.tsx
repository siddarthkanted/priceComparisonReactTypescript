import { Label, Link } from 'office-ui-fabric-react';
import * as React from "react";
import { ValueType } from 'react-select/lib/types';
import { Parent } from 'src/components/Offers/Parent';
import { PartnerDictionary } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { AffiliateLinkUtils, IAffiliateLink } from 'src/model/AffiliateLink';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';


export class Partner extends Parent {
    protected renderOption(option: ValueType<IOptionType>): JSX.Element {
        const name = OptionTypeUtils.getValue(option)
        const partner = PartnerDictionary[name];
        return (
            <div key={name}>
                <Label>{name}</Label>
                {this.renderLink(partner, partner.link, "Link")}
                {StringConstant.offerVariableNameList.map(offer => this.renderLink(partner, partner[offer], offer))}
            </div>
        );
    }
    protected getTitle(): string {
        return StringConstant.partner;
    }
    protected getList(): Array<ValueType<IOptionType>> {
        const partnerArray = Object.keys(PartnerDictionary).map(key => PartnerDictionary[key]);
        return partnerArray.map(partner => OptionTypeUtils.createOptionType(partner.name));
    }
    private renderLink(affiliateLink: IAffiliateLink, link?: string, name?: string): React.ReactNode {
        if (link) {
            const finalUrl = AffiliateLinkUtils.getAffiliatedLink(affiliateLink, link);
            return (<Link href={finalUrl} target="_blank">
                {name}
            </Link>);
        }
        return;
    }
}
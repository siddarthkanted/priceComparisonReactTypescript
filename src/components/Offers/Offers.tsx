import { Label, Link } from 'office-ui-fabric-react';
import * as React from "react";
import { ValueType } from 'react-select/lib/types';
import { Parent } from 'src/components/Offers/Parent';
import { PartnerDictionary } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { AffiliateLinkUtils, IAffiliateLink } from 'src/model/AffiliateLink';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';


export class Offers extends Parent {
    protected renderOption(option: ValueType<IOptionType>): JSX.Element {
        const name = OptionTypeUtils.getValue(option)
        const partnerArray = Object.keys(PartnerDictionary).map(key => PartnerDictionary[key]);
        return (
            <div key={name}>
                <Label>{name}</Label>
                {partnerArray.map(partner => this.renderLink(partner, name))}
            </div>
        );
    }
    protected getTitle(): string {
        return StringConstant.offer;
    }
    protected getList(): Array<ValueType<IOptionType>> {
        return StringConstant.offerVariableNameList.map(offer => OptionTypeUtils.createOptionType(offer))
    }
    private renderLink(partner: IAffiliateLink, offerName: string): React.ReactNode {
        if (partner[offerName]) {
            const finalUrl = AffiliateLinkUtils.getAffiliatedLink(partner, partner[offerName]);
            return (<Link href={finalUrl} target="_blank">
                {partner.name}
            </Link>);
        }
        return;
    }
}
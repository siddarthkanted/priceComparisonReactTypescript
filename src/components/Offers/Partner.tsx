import * as React from "react";
import { ValueType } from 'react-select/lib/types';
import 'src/components/AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener.css';
import { MultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/MultipleUrlOpener';
import { Parent } from 'src/components/Offers/Parent';
import { PartnerDictionary } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { IAffiliateLink } from 'src/model/AffiliateLink';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';


export class Partner extends Parent {
    protected renderOption(option: ValueType<IOptionType>): JSX.Element {
        const value = OptionTypeUtils.getValue(option)
        const partner = PartnerDictionary[value];
        return (
            <>
                <MultipleUrlOpener title={partner.name} partners={[partner]} key={partner.name} />
                {this.renderPartnerDetails(partner)}
            </>
        );
    }
    protected getTitle(): string {
        return StringConstant.partner;
    }
    protected getList(): Array<ValueType<IOptionType>> {
        return Object.keys(PartnerDictionary)
            .map(key => OptionTypeUtils.createOptionType(key, PartnerDictionary[key].name));
    }
    private renderPartnerDetails(partner: IAffiliateLink): JSX.Element {
        return (
            <>
                {partner.referralCode && this.renderLabelValue("Referral code", partner.referralCode)}
                {partner.email && this.renderLabelValue("Email", partner.email)}
                {partner.phone && this.renderLabelValue("Phone", partner.phone)}
            </>
        );
    }
    private renderLabelValue(label: string, value: string): JSX.Element {
        return (
            <>
                <span className={"marginLeft"}><b>{label}:</b></span>
                <span className={"marginLeft"}>{value}</span>
            </>
        );
    }
}
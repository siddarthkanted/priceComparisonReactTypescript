import * as React from "react";
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/MultipleUrlOpener';
import { Parent } from 'src/components/Offers/Parent';
import { PartnerDictionary } from 'src/constants/Constants';
import { StringConstant } from 'src/constants/StringConstant';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';


export class Partner extends Parent {
    protected renderOption(option: ValueType<IOptionType>): JSX.Element {
        const name = OptionTypeUtils.getValue(option)
        const partner = PartnerDictionary[name];
        return <MultipleUrlOpener title={name} variableNames={StringConstant.offerVariableNameList} partners={[partner]} />;
    }
    protected getTitle(): string {
        return StringConstant.partner;
    }
    protected getList(): Array<ValueType<IOptionType>> {
        const partnerArray = Object.keys(PartnerDictionary).map(key => PartnerDictionary[key]);
        return partnerArray.map(partner => OptionTypeUtils.createOptionType(partner.name));
    }
}
import * as React from "react";
import { ValueType } from 'react-select/lib/types';
import { MultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/MultipleUrlOpener';
import { Parent } from 'src/components/Offers/Parent';
import { StringConstant } from 'src/constants/StringConstant';
import { IOptionType, OptionTypeUtils } from 'src/model/OptionType';


export class Offers extends Parent {
    protected renderOption(option: ValueType<IOptionType>): JSX.Element {
        const name = OptionTypeUtils.getValue(option)
        return <MultipleUrlOpener title={name} variableNames={[name]} key={name} />;
    }
    protected getTitle(): string {
        return StringConstant.offer;
    }
    protected getList(): Array<ValueType<IOptionType>> {
        return StringConstant.offerVariableNameList.map(offer => OptionTypeUtils.createOptionType(offer))
    }
}
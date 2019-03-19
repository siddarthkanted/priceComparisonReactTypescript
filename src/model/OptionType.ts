import { ValueType } from 'react-select/lib/types';

export interface IOptionType {
    value: string;
    label: string;
}

export class OptionTypeUtils {
    public static createOptionType(value: string, label?: string): IOptionType {
        label = label ? label : value;
        return {
            label,
            value
        };
    }

    public static getValue(valueType: ValueType<IOptionType>): string {
        return (valueType as IOptionType).value
    }

    public static getLabel(valueType: ValueType<IOptionType>): string {
        return (valueType as IOptionType).label
    }
}
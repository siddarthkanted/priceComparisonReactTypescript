import { ValueType } from 'react-select/lib/types';

export enum Status {
    NotStarted = "NotStarted",
    Loading = "Loading",
    Success = "Success",
    Failure = "Failure",
}

export interface IRootReducer {
    groceryReducer: IGroceryReducer;
}

export interface IGroceryReducer {
    groceryList: IGrocery[];
    status: Status;
}

export interface IGrocery
{
    Category: string[];
    Images: string[];
    Link: string[];
    Name: string[];
}

export interface IAffiliateLink {
    link: string;
    referralCode?: string;
    name?: string;
    email?: string;
    phone?: string;
    isCuelinks?: boolean;
    extraParameters?: _.Dictionary<string>;
    variedOptions?: _.Dictionary<string>;
}

export interface IOptionType {
    value: string;
    label: string;
}

export interface IRoute {
    className?: string;
    component: React.ComponentClass;
    extraProps?: _.Dictionary<any>;
    name: string;
    path?: string;
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
import { ValueType } from 'react-select/lib/types';
import { IAffiliateLink, IOptionType, OptionTypeUtils } from 'src/common/Model';
import { Utils } from 'src/common/Utils';

export interface ICategory {
    links: IAffiliateLink[],
    titleOptionType: ValueType<IOptionType>;
    renderDescription?: () => JSX.Element
}

export class CategoryUtils {
    public static createCategory(links: IAffiliateLink[], title: string, renderDescription?: () => JSX.Element) {
        return { links, titleOptionType: OptionTypeUtils.createOptionType(title), renderDescription };
    }

    public static getUrl(optionType: ValueType<IOptionType>): string {
        return Utils.getUrl(CategoryUtils.getUrlWithoutHost(optionType));
    }

    public static getUrlWithoutHost(optionType: ValueType<IOptionType>): string {
        return Utils.getUrlWithoutHost("Offers", OptionTypeUtils.getValue(optionType));
    }
}
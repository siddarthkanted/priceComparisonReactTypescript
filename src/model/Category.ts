import { ValueType } from 'react-select/lib/types';
import { Utils } from 'src/common/Utils';
import { IAffiliateLink, IOptionType, OptionTypeUtils } from 'src/model/Model';

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
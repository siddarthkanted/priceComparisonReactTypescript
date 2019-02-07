import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { RouteComponentProps } from "react-router";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { Utils } from "src/common/Utils";
import { AffiliateMultipleUrlOpener } from 'src/components/AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';
import { CategoryList } from 'src/constants/Offers';
import { CategoryUtils, ICategory } from 'src/model/Category';
import { IOptionType, OptionTypeUtils } from 'src/model/Model';

interface IUrlParams {
    displayCategoryString?: string;
}

interface IOffersProps  extends RouteComponentProps<IUrlParams> {

}

interface IOffersState {
    displayCategory: ValueType<IOptionType>;
}

export class Offers extends React.Component<IOffersProps, IOffersState> {
    private OfferLinksOption = {value: "All offers", label: "All offers"};

    public componentWillMount(): void {
        this.setDisplayCategoryState();
    }

    public componentDidMount(): void {
        document.title = "Offers - " + OptionTypeUtils.getLabel(this.state.displayCategory);
    }

    public render(): JSX.Element {
        const displayCategoryValue = OptionTypeUtils.getValue(this.state.displayCategory);
        const isOfferLinksSelected = displayCategoryValue === OptionTypeUtils.getValue(this.OfferLinksOption);

        return (
            <>
                <h3>{"Offers Multiple URL Opener"}</h3>
                <Select
                    value={this.state.displayCategory}
                    onChange={this.dropdownOnChange}
                    options={[this.OfferLinksOption, ...CategoryList.map(category => category.titleOptionType)]}
                />
                {isOfferLinksSelected && CategoryList.map((category, index) => this.renderAffiliateMultipleUrlOpener(index, category))}
                {!isOfferLinksSelected && this.renderAffiliateMultipleUrlOpener(0, CategoryList.find(category => (category.titleOptionType as IOptionType).value === displayCategoryValue))}
            </>
        );
    }

    private renderAffiliateMultipleUrlOpener(index: number, category?: ICategory): JSX.Element | undefined{
        if (!category) {
            return;
        }
        return (
            <AffiliateMultipleUrlOpener
                getLinks={() => category.links}
                title={OptionTypeUtils.getValue(category.titleOptionType)}
                renderDescription={category.renderDescription}
                key={index}
            />
        );
    }

    private dropdownOnChange(displayCategory: ValueType<IOptionType>): void {
        window.location.href = CategoryUtils.getUrl(displayCategory);
    }

    @autobind
    private setDisplayCategoryState(): void {
        const { displayCategoryString } = this.props.match.params;
        if (!displayCategoryString) {
            this.setState({displayCategory: this.OfferLinksOption});
            return;
        } else {
            const selectedCategory = CategoryList.find(category => Utils.convertToSlug(OptionTypeUtils.getValue(category.titleOptionType)) === displayCategoryString);
            this.setState({displayCategory: selectedCategory ? selectedCategory.titleOptionType : this.OfferLinksOption});
        } 
    }
}
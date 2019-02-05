import { autobind } from '@uifabric/utilities';
import * as React from "react";
import { RouteComponentProps } from "react-router";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { AllOffers } from "src/components/Common/Constants";
import { IAffiliateLink, IOptionType, OptionTypeUtils } from 'src/components/Common/Model';
import { AffiliateMultipleUrlOpener } from './AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';
import { Utils } from './Utils';

interface IUrlParams {
    displayCategoryString?: string;
}

interface IOffersProps  extends RouteComponentProps<IUrlParams> {

}

interface ICategory {
    links: IAffiliateLink[],
    titleOptionType: ValueType<IOptionType>;
    renderDescription?: () => JSX.Element
}

interface IOffersState {
    displayCategory: ValueType<IOptionType>;
}

export class Offers extends React.Component<IOffersProps, IOffersState> {
    private categoryList: ICategory[];
    private allOffersOption = {value: "All offers", label: "All offers"};

    public componentWillMount(): void {
        this.categoryList = [
            this.createCategory(AllOffers.affilateWebSite, "Affiliate web sites", this.renderAffilateWebSitesDescription),
            this.createCategory(AllOffers.movieBooking, "Movie Tickets"),
            this.createCategory(AllOffers.foodDelivery, "Food order"),
            this.createCategory(AllOffers.grocery, "Grocery"),
            this.createCategory(AllOffers.wallet, "Wallet Offers"),
            this.createCategory(AllOffers.mobileRecharge, "Mobile Recharge"),
            this.createCategory(AllOffers.cabBooking, "Cab booking"),
            this.createCategory(AllOffers.electricity, "Electricity bill payment"),
            this.createCategory(AllOffers.flightOffers, "Flight Tickets"),
            this.createCategory(AllOffers.trainOffers, "Train Tickets"),
            this.createCategory(AllOffers.busOffers, "Bus Tickets"),
            this.createCategory(AllOffers.investment, "Investment"),
        ];
        this.setDisplayCategoryState();
    }

    public render(): JSX.Element {
        const displayCategoryValue = OptionTypeUtils.getValue(this.state.displayCategory);
        const isAllOffersSelected = displayCategoryValue === OptionTypeUtils.getValue(this.allOffersOption);

        return (
            <>
                <h3>{"Offers Multiple URL Opener"}</h3>
                <Select
                    value={this.state.displayCategory}
                    onChange={this.dropdownOnChange}
                    options={[this.allOffersOption, ...this.categoryList.map(category => category.titleOptionType)]}
                />
                {isAllOffersSelected && this.categoryList.map((category, index) => this.renderAffiliateMultipleUrlOpener(index, category))}
                {!isAllOffersSelected && this.renderAffiliateMultipleUrlOpener(0, this.categoryList.find(category => (category.titleOptionType as IOptionType).value === displayCategoryValue))}
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

    private renderAffilateWebSitesDescription(): JSX.Element {
        return (
            <ul>
                <li>These companies work on affiliate marketing. If you buy on any shopping websites like - Amazon, Flipkart, via these affiliate sites, then these affiliate sites earn some commission from shopping websites.</li>
                <li>Affiliate sites do not keep all this commission, instead of, some percentage of&nbsp;commission they give it back to you.</li>
                <li>Smart shoppers like you, buy via these affiliate sites so that they can take advantage of both online shopping websites deals and the commission from these affiliate sites.</li>
            </ul>
        );
    }

    private createCategory(links: IAffiliateLink[], title: string, renderDescription?: () => JSX.Element) {
        return { links, titleOptionType: OptionTypeUtils.createOptionType(title), renderDescription };
    }

    private dropdownOnChange(displayCategory: ValueType<IOptionType>): void {
        window.location.href = Utils.getUrl("Offers", (displayCategory as IOptionType).value);
    }

    @autobind
    private setDisplayCategoryState(): void {
        const { displayCategoryString } = this.props.match.params;
        if (!displayCategoryString) {
            this.setState({displayCategory: this.allOffersOption});
            return;
        } else {
            const selectedCategory = this.categoryList.find(category => Utils.convertToSlug(OptionTypeUtils.getValue(category.titleOptionType)) === displayCategoryString);
            this.setState({displayCategory: selectedCategory ? selectedCategory.titleOptionType : this.allOffersOption});
        } 
    }
}
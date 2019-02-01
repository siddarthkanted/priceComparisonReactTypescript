import * as React from "react";
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import { AllOffers } from "src/components/Common/Constants";
import { IAffiliateLink, IOptionType } from 'src/components/Common/Model';
import { AffiliateMultipleUrlOpener } from './AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';

interface ICategory {
    links: IAffiliateLink[],
    title: string,
    renderDescription?: () => JSX.Element
}

interface IOffersState {
    displayCategory: ValueType<IOptionType>;
}

export class Offers extends React.Component<any, IOffersState> {
    private categoryList: ICategory[];
    private allOffersOption = {value: "All offers", label: "All offers"};

    public componentWillMount(): void {
        this.categoryList = [
            this.createCategory(AllOffers.affilateWebSite, "Affiliate web sites", this.renderAffilateWebSitesDescription),
            this.createCategory(AllOffers.movieBooking, "Movie Tickets"),
            this.createCategory(AllOffers.foodDelivery, "Food order"),
            this.createCategory(AllOffers.wallet, "Wallet Offers"),
            this.createCategory(AllOffers.mobileRecharge, "Mobile Recharge"),
            this.createCategory(AllOffers.cabBooking, "Cab booking"),
            this.createCategory(AllOffers.electricity, "Electricity bill payment"),
            this.createCategory(AllOffers.flightOffers, "Flight Tickets"),
            this.createCategory(AllOffers.trainOffers, "Train Tickets"),
            this.createCategory(AllOffers.busOffers, "Bus Tickets")
        ];
        this.setState({displayCategory: this.allOffersOption});
    }

    public render(): JSX.Element {
        const displayCategoryValue = (this.state.displayCategory as IOptionType).value;
        const isAllOffersSelected = displayCategoryValue === (this.allOffersOption as IOptionType).value;

        return (
            <>
                <h3>{"Offers Multiple URL Opener"}</h3>
                <Select
                    value={this.state.displayCategory}
                    onChange={(displayCategory) => this.setState({ displayCategory })}
                    options={[this.allOffersOption, ...this.categoryList.map(category => ({value: category.title, label: category.title }))]}
                />
                {isAllOffersSelected && this.categoryList.map((category, index) => this.renderAffiliateMultipleUrlOpener(index, category))}
                {!isAllOffersSelected && this.renderAffiliateMultipleUrlOpener(0, this.categoryList.find(category => category.title === displayCategoryValue))}

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
                title={category.title}
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
        return { links, title, renderDescription };
    }
}
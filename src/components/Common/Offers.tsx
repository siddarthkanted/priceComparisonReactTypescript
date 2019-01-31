import * as React from "react";
import { AllOffers } from "src/components/Common/Constants";
import { AffiliateMultipleUrlOpener } from './AffiliateMultipleUrlOpener/AffiliateMultipleUrlOpener';

export class Offers extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <>
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.affilateWebSite}
                title={"Affiliate web sites"}
                renderDescription={this.renderAffilateWebSitesDescription}
            />
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.movieBooking}
                title={"Movie booking"}
            />
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.foodDelivery}
                title={"Food order"}
            />
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.wallet}
                title={"Wallet"}
            />
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.mobileRecharge}
                title={"Mobile recharge"}
            />
            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.cabBooking}
                title={"Cab booking"}
            />

            <AffiliateMultipleUrlOpener
                getLinks={() => AllOffers.electricity}
                title={"Electricity"}
            />
            </>
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
}
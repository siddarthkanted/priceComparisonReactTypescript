import { Utils } from 'src/common/Utils';

export interface IAffiliateLink {
    referralLink: string;
    name: string;
    // customer care
    email?: string;
    phone?: string;
    // affilate
    referralCode?: string;
    isCuelinks?: boolean;
    extraParameters?: _.Dictionary<string>;
    variedOptions?: _.Dictionary<string>;
    // booking
    busBooking?: string;
    flightBooking?: string;
    trainBooking?: string;
    groceryBooking?: string;
    // offer
    walletOffer?: string;
    mobileRechargeOffer?: string;
    movieOffer?: string;
    billPaymentOffer?: string;
    flightOffer?: string;
    trainOffer?: string;
    busOffer?: string;
    travelOffer?: string;
    groceryOffer?: string;
    foodOrderOffer?: string;
    healthOffer?: string;
    servicesOffer?: string;
    hotelOffer?: string;
    activityOffer?: string;
    cashBackOffer?: string;
    cabOffer?: string;
    onlineShopping?: string;
    houseRent?: string;
}

export class AffiliateLinkUtils {
    public static getLink(affiliateLink: IAffiliateLink): string {
        return AffiliateLinkUtils.getAffiliatedLink(affiliateLink, affiliateLink.referralLink as string);
    }

    public static getAffiliatedLink(affiliateLink: IAffiliateLink, link: string): string {
        if(Utils.isStringNullOrEmpty(link)) {
            return link;
        }
        let finalUrl = link;
        if (affiliateLink.isCuelinks) {
            finalUrl = "https://linksredirect.com/?pub_id=16208CL14551&source=linkkit&url=" + finalUrl;
        }
        if (affiliateLink.extraParameters) {
            finalUrl = AffiliateLinkUtils.setExtraParameters(affiliateLink.extraParameters, finalUrl);
        }
        return finalUrl;
    }

    public static getName(affiliateLink: IAffiliateLink, variableName: string): string {
        return affiliateLink.name ? affiliateLink.name : Utils.getHostNameFromUrl(affiliateLink[variableName]);
    }

    private static setExtraParameters(extraParameters: _.Dictionary<string>, urlString: string): string {
        const url = new URL(urlString);
        for (const key of Object.keys(extraParameters)) {
            url.searchParams.set(key, extraParameters[key]);
        }
        return url.toString();
    }
}
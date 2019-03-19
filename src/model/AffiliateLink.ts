export interface IAffiliateLink {
    link: string;
    referralCode?: string;
    name: string;
    email?: string;
    phone?: string;
    isCuelinks?: boolean;
    extraParameters?: _.Dictionary<string>;
    variedOptions?: _.Dictionary<string>;
    busBooking?: string;
    flightBooking?: string;
    trainBooking?: string;
    walletOffer?: string;
    mobileRechargeOffer?: string;
    movieBookingOffer?: string;
    electricityOffer?: string;
    flightOffer?: string;
    trainOffer?: string;
    busOffer?: string;
}

export class AffiliateLinkUtils {
    public static getLink(affiliateLink: IAffiliateLink): string {
        return AffiliateLinkUtils.getAffiliatedLink(affiliateLink, affiliateLink.link);
    }

    public static getAffiliatedLink(affiliateLink: IAffiliateLink, link: string): string {
        let finalUrl = link;
        if (affiliateLink.isCuelinks) {
            finalUrl = "https://linksredirect.com/?pub_id=16208CL14551&source=linkkit&url=" + finalUrl;
        }
        if (affiliateLink.extraParameters) {
            finalUrl = AffiliateLinkUtils.setExtraParameters(affiliateLink.extraParameters, finalUrl);
        }
        return finalUrl;
    }

    private static setExtraParameters(extraParameters: _.Dictionary<string>, urlString: string): string {
        const url = new URL(urlString);
        for (const key of Object.keys(extraParameters)) {
            url.searchParams.set(key, extraParameters[key]);
        }
        return url.toString();
    }
}
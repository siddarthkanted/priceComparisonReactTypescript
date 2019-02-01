export interface IAffiliateLink {
    link: string;
    referralCode?: string;
    name?: string;
    email?: string;
    phone?: string;
    isCuelinks?: boolean;
    extraParameters?: _.Dictionary<string>
}
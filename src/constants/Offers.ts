import { OfferLinks } from 'src/constants/Constants';
import { CategoryUtils } from "src/model/Category";

export const CategoryList = [
    CategoryUtils.createCategory(OfferLinks.affilateWebSite, "Affiliate web sites"),
    CategoryUtils.createCategory(OfferLinks.movieBooking, "Movie Tickets"),
    CategoryUtils.createCategory(OfferLinks.foodDelivery, "Food order"),
    CategoryUtils.createCategory(OfferLinks.grocery, "Grocery"),
    CategoryUtils.createCategory(OfferLinks.wallet, "Wallet Offers"),
    CategoryUtils.createCategory(OfferLinks.mobileRecharge, "Mobile Recharge"),
    CategoryUtils.createCategory(OfferLinks.cabBooking, "Cab booking"),
    CategoryUtils.createCategory(OfferLinks.electricity, "Electricity bill payment"),
    CategoryUtils.createCategory(OfferLinks.flightOffers, "Flight Tickets"),
    CategoryUtils.createCategory(OfferLinks.trainOffers, "Train Tickets"),
    CategoryUtils.createCategory(OfferLinks.busOffers, "Bus Tickets"),
    CategoryUtils.createCategory(OfferLinks.investment, "Investment"),
];
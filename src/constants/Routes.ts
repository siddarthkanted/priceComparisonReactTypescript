import { Offers } from 'src/components/Offers/Offers';
import {
  default as Container
} from "src/components/Product/Container";
import { Travel } from "src/components/Travel/Travel";
import { BuyLinks, OfferLinks, TravelOptions } from "src/constants/Constants";
import { IRoute } from 'src/model/Model';

export const routeList: IRoute[] = [
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.flight,
        ["offerLinks"]: OfferLinks.flightOffers,
        ["options"]: TravelOptions.flightOptions,
        ["title"]: "Flights Multiple URL Opener",
      },
      name: "Flight"
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.train,
        ["offerLinks"]: OfferLinks.trainOffers,
        ["options"]: TravelOptions.trainOptions,
        ["title"]: "Train Multiple URL Opener",
      },
      name: "Train"
    },
    {
      component: Travel,
      extraProps: {
        ["links"]: BuyLinks.bus,
        ["offerLinks"]: OfferLinks.busOffers,
        ["options"]: TravelOptions.busOptions,
        ["title"]: "Bus Multiple URL Opener",
      },
      name: "Bus"
    },
    {
      className: "groceryMain",
      component: Container,
      name: "Grocery",
      path: "Grocery/:parentCategory?/:childCategory?"
    },
    {
      component: Offers,
      name: "Offers",
      path: "Offers/:displayCategoryString?"
    }
  ];
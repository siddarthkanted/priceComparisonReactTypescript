import { Offers } from 'src/components/Offers/Offers';
import { Partner } from 'src/components/Offers/Partner';
import {
  default as Container
} from "src/components/Product/Container";
import { Travel } from "src/components/Travel/Travel";
import { TravelOptions } from "src/constants/Constants";
import { IRoute } from 'src/model/Model';
import { StringConstant } from './StringConstant';

export const routeList: IRoute[] = [
  {
    component: Travel,
    extraProps: {
      ["options"]: TravelOptions.flightOptions,
      ["title"]: "Flights Multiple URL Opener",
      ["offerVariableName"]: StringConstant.flightOffer,
      ["bookingVariableName"]: StringConstant.flightBooking,
    },
    name: "Flight"
  },
  {
    component: Travel,
    extraProps: {
      ["options"]: TravelOptions.trainOptions,
      ["title"]: "Train Multiple URL Opener",
      ["offerVariableName"]: StringConstant.trainOffer,
      ["bookingVariableName"]: StringConstant.trainBooking,
    },
    name: "Train",
  },
  {
    component: Travel,
    extraProps: {
      ["options"]: TravelOptions.busOptions,
      ["title"]: "Bus Multiple URL Opener",
      ["offerVariableName"]: StringConstant.busOffer,
      ["bookingVariableName"]: StringConstant.busBooking,
    },
    name: "Bus",
  },
  {
    className: "groceryMain",
    component: Container,
    name: "Grocery",
    path: "Grocery/:parentCategory?/:childCategory?"
  },
  {
    component: Offers,
    name: StringConstant.offer,
    path: StringConstant.offer + "/:urlParam?"
  },
  {
    component: Partner,
    name: StringConstant.partner,
    path: StringConstant.partner + "/:urlParam?"
  }
];
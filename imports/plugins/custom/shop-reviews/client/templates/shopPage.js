import { Template } from "meteor/templating";

import "./shopPage.html";
import ShopReviewsContainer from "../containers/reviews.jsx";

Template.shopPage.helpers({
  ShopReviewsContainer() {
    return ShopReviewsContainer;
  }
});

import { registerComponent } from "@reactioncommerce/reaction-components";
import { ShopLink, ShopAverage, ShopReviewsPresentational, ShopReviewsList } from "./components";
import { ShopReviewsContainer } from "./containers";
import "./templates/shopPage";
registerComponent("ShopLink", ShopLink);
registerComponent("ShopAverage", ShopAverage);
registerComponent("ShopReviewsPresentational", ShopReviewsPresentational);
registerComponent("ShopReviewsList", ShopReviewsList);

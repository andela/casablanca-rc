import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "ShopReviews",
  name: "shop-reviews-and-ratings",
  autoEnable: true,
  registry: [{
    route: "shops/:shopSlug",
    name: "shops",
    workflow: "coreProductGridWorkflow",
    template: "shopPage"
  }]
});

import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../../reviews/lib/collections";
import { Products, Shops } from "../../../../../../lib/collections";

Meteor.methods({
  "shopReviews/create"(review, reviewer, rating, revieweeId) {
    check(review, String);
    check(reviewer, String);
    check(rating, Number);
    check(revieweeId, String);

    Reviews.insert({
      review,
      reviewer,
      rating,
      revieweeId,
      createdAt: new Date()
    });
  },
  "shopReviews/average"(revieweeId) {
    check(revieweeId, String);
    const exists = Reviews.findOne({ revieweeId });
    if (exists === undefined) {
      return 0;
    }
    const result = Reviews.aggregate([
      {
        $match: {
          revieweeId
        }
      },
      {
        $group: {
          _id: "$revieweeId",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    return result[0].averageRating;
  },
  "product/shop"(productId) {
    check(productId, String);
    const result = Products.findOne({ handle: productId });
    return result.shopId;
  },
  "shop/details"(shopId) {
    check(shopId, String);
    const result = Shops.findOne({ _id: shopId });
    return result;
  }
});

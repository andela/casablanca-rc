import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";
import { Products } from "../../../../../../lib/collections";

Meteor.methods({
  "review/create"(review, reviewer, rating, revieweeId) {
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
  "reviews/average"(revieweeId) {
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
  "review/product"(productId) {
    check(productId, String);
    return Products.findOne({ handle: productId });
  },
  "product/average"(revieweeId, average) {
    check(revieweeId, String);
    check(average, Number);
    const result = Products.findOne({ handle: revieweeId });
    if (result) {
      const _id = result._id;
      const averageRating = average;
      const productUpdate = Object.assign({}, result, { averageRating });
      Products.upsert({ _id }, { $set: productUpdate });
    }
  }
});

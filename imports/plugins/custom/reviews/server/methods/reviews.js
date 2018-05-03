import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";

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
      revieweeId
    });
  }
});

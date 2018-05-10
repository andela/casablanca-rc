import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../../reviews/lib/collections";
import { Products } from "../../../../../../lib/collections";

Meteor.publish("ShopReviews", function (revieweeId) {
  check(revieweeId, String);
  if (Meteor.isServer) {
    if (!this.userId) {
      return this.ready();
    }

    return Reviews.find(
      {
        revieweeId
      },
      {
        sort: [["createdAt", "desc"]]
      }
    );
  }
});

Meteor.publish("ShopProducts", function (revieweeId) {
  check(revieweeId, String);
  if (Meteor.isServer) {
    return Products.find({
      shopId: revieweeId
    });
  }
});

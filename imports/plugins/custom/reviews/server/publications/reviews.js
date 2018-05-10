import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";

Meteor.publish("Reviews", function (revieweeId) {
  check(revieweeId, String);
  if (Meteor.isServer) {
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

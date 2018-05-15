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

Meteor.publish("ReviewsAverage", function (revieweeId) {
  check(revieweeId, String);
  if (Meteor.isServer) {
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
    console.log(result);
    return result;
  }
});

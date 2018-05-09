import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Review = new SimpleSchema({
  review: {
    type: String,
    optional: false
  },
  reviewer: {
    type: String,
    optional: false
  },
  rating: {
    type: Number,
    optional: false
  },
  revieweeId: {
    type: String,
    optional: false
  },
  createdAt: {
    type: Date,
    optional: false
  }
});

registerSchema("Review", Review);

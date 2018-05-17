import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reviews } from "../../../reviews/lib/collections";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import "../css/shop-reviews.css";

class ShopReviewsListContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { reviews = [] } = this.props;
    if (reviews.length === 0) {
      return (
        <div id="no-reviews">No reviews found</div>
      );
    }
    return (
      <div className="reviews-list-vertical">
        <Components.ShopReviewsList reviews={reviews} />
      </div>
    );
  }
}
function composer(props, onData) {
  const revieweeId = Reaction.Router.getParam("shopSlug");
  if (Meteor.subscribe("ShopReviews", revieweeId).ready()) {
    const reviews = Reviews.find({}, { sort: { createdAt: -1 } }).fetch();
    onData(null, { reviews });
  }
}

registerComponent("ShopReviewsListContainer", ShopReviewsListContainer, composeWithTracker(composer));
export default composeWithTracker(composer)(ShopReviewsListContainer);

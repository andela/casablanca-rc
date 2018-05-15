import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Components } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Session } from "meteor/session";
import { Products } from "../../../../../../lib/collections";
import "../css/shop-reviews.css";

class ShopReviewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      review: "",
      shop: {}
    };
    this.currentUser = Meteor.user();
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const revieweeId = Reaction.Router.getParam("shopSlug");
    const self = this;
    Meteor.call("shopReviews/average", revieweeId, function (err, data) {
      if (!err) {
        Session.set("shopAverageRating", data);
      }
    });
    Meteor.call("shop/details", revieweeId, function (err, data) {
      if (!err) {
        self.setState({
          shop: data
        });
      }
    });
  }

  handleRatingChange(e) {
    this.setState({
      rating: e
    });
  }

  handleReviewChange(e) {
    this.setState({
      review: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const rating = parseInt(this.state.rating, 10);
    const review = this.state.review;
    const name = this.currentUser.name;
    const revieweeId = this.props.products[0].shopId;
    Meteor.call("shopReviews/create", review, name, rating, revieweeId);
    Meteor.call("shopReviews/average", revieweeId, function (err, data) {
      if (!err) {
        Session.set("shopAverageRating", data);
      }
    });
    this.clearFields();
    $("#shopReviewsModal").modal("hide");
  }

  clearFields() {
    this.setState({
      rating: "",
      review: ""
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-9 col-md-9 col-sm-12 col-md-12">
          <div className="shop-name">{this.state.shop.name}</div>
          <Components.Products products={this.props.products}/>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-12 col-md-12">
          <div className="shop-reviews-heading">
            All reviews <br />
          </div>
          <Components.ShopAverage averageRating={Session.get("shopAverageRating")} />
          <br />
          <Components.ShopReviewsPresentational
            handleSubmit={this.handleSubmit}
            handleRatingChange={this.handleRatingChange}
            handleReviewChange={this.handleReviewChange}
            rating={parseInt(this.state.rating, 10)}
            review={this.state.review}
            currentUser={this.currentUser}
            shopName={this.state.shop.name}
          />
          <div className="rui separator divider">
            <hr className="reviews-divider"/>
          </div>
          <div className="ten-padding" />
          <Components.ShopReviewsListContainer />
        </div>
      </div>
    );
  }
}

function composer(props, onData) {
  const revieweeId = Reaction.Router.getParam("shopSlug");
  if (Meteor.subscribe("ShopProducts", revieweeId).ready()) {
    const products = Products.find({}).fetch();
    onData(null, { products });
  }
}

registerComponent("ShopReviewsContainer", ShopReviewsContainer, composeWithTracker(composer));
export default composeWithTracker(composer)(ShopReviewsContainer);

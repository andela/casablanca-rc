import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { Session } from "meteor/session";
import { ReviewsPresentational } from "../components";
import { ReviewsList } from "../components";
import "../css/reviews.css";
import { Reviews } from "../../lib/collections";

class ReviewsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: "",
      rating: "",
      products: [],
      product: {}
    };

    this.currentUser = Meteor.user();
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const self = this;
    const revieweeId = Reaction.Router.getParam("handle");
    Meteor.call("reviews/average", revieweeId, function (err, data) {
      if (!err) {
        Session.set("averageRating", data);
      }
    });
    Meteor.call("review/product", revieweeId, function (err, data) {
      if (!err) {
        self.setState({
          product: data
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

    // console.log([this.state.rating, this.state.review, this.state.reviewer], 'review details');
    const rating = parseInt(this.state.rating, 10);
    const review = this.state.review;
    const reviewer = this.currentUser.name;
    const revieweeId = Reaction.Router.getParam("handle");
    Meteor.call("review/create", review, reviewer, rating, revieweeId);
    Meteor.call("reviews/average", revieweeId, function (err, data) {
      if (!err) {
        Session.set("averageRating", data);
      }
    });
    this.clearFields();
    $("#reviewModal").modal("hide");
  }

  clearFields() {
    this.setState({
      rating: "",
      review: ""
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <ReviewsPresentational
          review={this.state.review}
          currentUser={this.currentUser}
          revieweeId={this.state.revieweeId}
          rating={parseInt(this.state.rating, 10)}
          handleSubmit={this.handleSubmit}
          handleRatingChange={this.handleRatingChange}
          handleReviewChange={this.handleReviewChange}
          averageRating={Session.get("averageRating")}
          productName={this.state.product.title}
        />
        <div>
          <h1 className="padding-twenty reviews-heading">All reviews</h1>
          <div className="reviews-list-vertical">
            <ReviewsList reviews={this.props.reviews}/>
          </div>
        </div>
      </div>
    );
  }
}

function composer(props, onData) {
  const revieweeId = Reaction.Router.getParam("handle");
  if (Meteor.subscribe("Reviews", revieweeId).ready()) {
    const reviews = Reviews.find({}, { sort: { createdAt: -1 } }).fetch();

    onData(null, { reviews });
  }
  if (Meteor.subscribe("ReviewsAverage", revieweeId).ready()) {
    const averageRating = Reviews.find({}).fetch();

    onData(null, { averageRating });
  }
}

registerComponent("Reviews", ReviewsContainer, composeWithTracker(composer));
export default ReviewsContainer;

import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Reaction } from "/client/api";
import { ReviewsPresentational } from "../components";
import { ReviewsList } from "../components";
import "../css/reviews.css";
import { Reviews } from "../../lib/collections";

class ReviewsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: "",
      rating: ""
    };

    this.currentUser = Meteor.user();
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRatingChange(e) {
    this.setState({
      rating: e.target.value
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
    this.clearFields();
    $("#reviewModal").modal("hide");
  }

  clearFields() {
    this.setState({
      rating: "",
      review: "",
      reviewer: ""
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
          rating={this.state.rating}
          handleSubmit={this.handleSubmit}
          handleRatingChange={this.handleRatingChange}
          handleReviewChange={this.handleReviewChange}
          handleReviewerChange={this.handleReviewerChange}
        />
        <div>
          <h1 className="padding-twenty">All reviews</h1>
          <ReviewsList reviews={this.props.reviews}/>
        </div>
      </div>
    );
  }
}

function composer(props, onData) {
  const revieweeId = Reaction.Router.getParam("handle");
  if (Meteor.subscribe("Reviews", revieweeId).ready()) {
    const reviews = Reviews.find({}).fetch();

    onData(null, { reviews });
  }
  if (Meteor.subscribe("ReviewsAverage", revieweeId).ready()) {
    const averageRating = Reviews.find({}).fetch();

    onData(null, { averageRating });
  }
}

registerComponent("Reviews", ReviewsContainer, composeWithTracker(composer));
export default ReviewsContainer;

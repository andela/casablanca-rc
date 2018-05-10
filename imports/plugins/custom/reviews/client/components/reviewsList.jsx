import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { compose } from "recompose";
import ReactStars from "react-stars";
import moment from "moment";
import "../css/reviews.css";

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.reviews || (this.props.reviews && this.props.reviews.length === 0)) {
      return (
        <div id="no-reviews">No reviews found</div>
      );
    }
    const listItems = this.props.reviews.map(review =>
      <li key={review._id} className="list-item">
        <div className="row">
          <div className="rui separator divider">
            <div>
              <span><ReactStars value={review.rating} edit={false}/></span> <br />
              {review.review} <br />
              <p id="reviewer-details"> By {review.reviewer} on {moment(review.createdAt).format("LL")}</p>
            </div>
            <hr />
          </div>
        </div>
      </li>
    );
    return (
      <div className="reviews">
        <ul className="reviews-list">
          {listItems}
        </ul>
      </div>
    )
  }
}

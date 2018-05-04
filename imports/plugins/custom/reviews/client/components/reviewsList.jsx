import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { compose } from "recompose";
import ReactStars from "react-stars";
import '../css/reviews.css';

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.reviews.map(review =>
      <li key={review._id} className="list-item">
        <div className="row">
          <div className="col-md-4 col-xs-12 col-lg-4 col-sm-12">
            <span><ReactStars value={review.rating} edit={false}/></span> {review.reviewer}
          </div>
          <div className="col-md-8 col-xs-12 col-lg-8 col-sm-12">
            {review.review}
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

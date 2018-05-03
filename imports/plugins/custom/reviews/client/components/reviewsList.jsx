import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Components, registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { compose } from "recompose";

export default class ReviewsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.reviews.map(review =>
      <li key={review._id}>{review.review}</li>
    );
    return (
      <div className="reviews">
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
}

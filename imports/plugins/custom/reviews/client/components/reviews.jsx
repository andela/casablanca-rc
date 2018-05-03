import React, { Component } from 'react';
import { Reaction } from "/client/api";
import '../css/reviews.css';

export default class Reviews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="padding-thirty stars" id="width-hundred">
        <div className="rui separator divider labeled">
          <hr />
          <span className="label">
            <span>Reviews</span>
          </span>
          <hr />
        </div>
        <div className="star-group">
          <form action="" onSubmit={this.props.handleSubmit}>
            <input
              className="star star-5"
              id="star-5"
              type="radio"
              name="star"
              value="5"
              checked={this.props.rating === "5"}
              onChange={this.props.handleRatingChange}
            />
            <label className="star star-5" htmlFor="star-5" />

            <input
              className="star star-4"
              id="star-4"
              type="radio"
              name="star"
              value="4"
              checked={this.props.rating === "4"}
              onChange={this.props.handleRatingChange}
            />
            <label className="star star-4" htmlFor="star-4" />

            <input
              className="star star-3"
              id="star-3"
              type="radio"
              name="star"
              value="3"
              checked={this.props.rating === "3"}
              onChange={this.props.handleRatingChange}
            />
            <label className="star star-3" htmlFor="star-3" />

            <input
              className="star star-2"
              id="star-2"
              type="radio"
              name="star"
              value="2"
              checked={this.props.rating.value === "2"}
              onChange={this.props.handleRatingChange}
            />
            <label className="star star-2" htmlFor="star-2" />

            <input
              className="star star-1"
              id="star-1"
              type="radio"
              name="star"
              value="1"
              checked={this.props.rating === "1"}
              onChange={this.props.handleRatingChange}
            />
            <label className="star star-1" htmlFor="star-1" />

            <div className="twenty-top-padding">
              <p>
                Review <br />
                <textarea
                className="review-field"
                  name="review"
                  id="review"
                  value={this.props.review}
                  onChange={this.props.handleReviewChange}
                />
              </p>
              <p>
                Publish As:<br />
                <input
                  name="reviewer"
                  id="reviewer"
                  value={this.props.reviewer}
                  onChange={this.props.handleReviewerChange}
                />
              </p>
              <button className="btn review-button">
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

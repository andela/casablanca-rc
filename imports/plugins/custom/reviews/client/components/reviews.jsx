import React, { Component } from "react";
import ReactStars from "react-stars";
import "../css/reviews.css";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="padding-thirty stars" id="width-hundred">
          <div className="rui separator divider labeled">
            <hr />
            <span className="label">
              <span>Reviews</span>
            </span>
            <hr />
          </div>
          <div><ReactStars /></div>
        </div>
        {this.props.currentUser.name !== undefined ? (
          <div>
            <button
              type="button"
              className="btn review-button"
              data-toggle="modal"
              data-target="#reviewModal"
            >Add Review</button>
            <div
              className="modal fade"
              id="reviewModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="reviewModalLabel">Add a review</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <form action="" onSubmit={this.props.handleSubmit}>
                        <div className="star-group">
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
                        </div>

                        <br />

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
                          <button className="btn review-button">
                            Add Review
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : ""}
      </div>
    );
  }
}

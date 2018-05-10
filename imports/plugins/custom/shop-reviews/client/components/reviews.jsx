import React, { Component } from "react";
import ReactStars from "react-stars";
import "../../../reviews/client/css/reviews.css";

class ShopReviewsPresentational extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.currentUser.name !== undefined ? (
          <div>
            <div className="wrap-review-button">
              <button
                type="button"
                className="review-button"
                data-toggle="modal"
                data-target="#shopReviewsModal"
              >Add Review</button>
            </div>

            <div
              className="modal fade"
              id="shopReviewsModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="shopReviewsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content modal-padding-bottom">
                  <div className="modal-header">
                    <h2 className="modal-title modal-heading" id="reviewModalLabel">Add a review</h2>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body modal-padding">
                    <div>
                      <form action="" onSubmit={this.props.handleSubmit}>
                        <ReactStars onChange={this.props.handleRatingChange} size={20} value={this.props.rating}/>

                        <div className="twenty-top-padding">
                          <p>
                            Drop review {`for ${this.props.shopName}: `} <br /> <br />
                            <textarea
                              className="review-field"
                              name="review"
                              id="review"
                              value={this.props.review}
                              onChange={this.props.handleReviewChange}
                            />
                          </p>
                          <div className="review-modal-button">
                            <button className="review-button">
                              Add Review
                            </button>
                          </div>
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
export default ShopReviewsPresentational;

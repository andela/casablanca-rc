import React, { Component } from "react";
import moment from "moment";
import ReactStars from "react-stars";
import "../../../reviews/client/css/reviews.css";

class ShopReviewsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // let reviews = this.props.reviews ? this.props.reviews : [];
    return (
      <div>
        <div className="reviews">
          <ul className="reviews-list">
            {this.props.reviews.map(review => (
              <li key={review._id} className="list-item">
                <div className="row">
                  <div className="rui separator divider">
                    <div>
                      <span><ReactStars value={review.rating} edit={false}/></span> <br />
                      {review.review} <br />
                      <p id="reviewer-details"> By {review.reviewer} on {moment(review.createdAt).format("h:mm a, MMMM Do YYYY")}</p>
                    </div>
                    <hr />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default ShopReviewsList;

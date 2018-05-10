import React, { Component } from "react";
import ReactStars from "react-stars";
import "../css/shop-reviews.css";

class ShopAverage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="shop-average-rating"><ReactStars edit={false} value={this.props.averageRating}/></div>
    );
  }
}

export default ShopAverage;

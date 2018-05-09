import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import "../css/shop-reviews.css";
import { Router } from "/client/api";
import { Reaction } from "/client/api";

class ShopLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: ""
    };
  }
  componentDidMount() {
    const self = this;
    const productId = Reaction.Router.getParam("handle");
    Meteor.call("product/shop", productId, function (err, data) {
      if (!err) {
        self.setState({
          shopId: data
        });
      }
    });
  }
  render() {
    return (
      <div className="shop-heading">
        Sold by <a className="shop-link" onClick={() => Router.go(`/shops/${this.state.shopId}`)}>Reaction</a>
      </div>
    );
  }
}
export default ShopLink;

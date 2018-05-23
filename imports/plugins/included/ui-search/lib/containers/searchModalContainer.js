import React, { Component } from "react";
import { compose } from "recompose";
import _ from "lodash";
import { Reaction } from "/client/api";
import { registerComponent } from "@reactioncommerce/reaction-components";
import SearchSubscription from "./searchSubscription";

function tagToggle(arr, val) {
  if (arr.length === _.pull(arr, val).length) {
    arr.push(val);
  }
  return arr;
}

const wrapComponent = (Comp) => (
  class SearchModalContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collection: "products",
        value: localStorage.getItem("searchValue") || "",
        renderChild: true,
        facets: [],
        filterBy: {},
        sortBy: {}
      };
    }

    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        this.setState({
          renderChild: false
        });
      }
    }

    handleChange = (event, value) => {
      localStorage.setItem("searchValue", value);

      this.setState({ value });
    }

    handleClick = () => {
      localStorage.setItem("searchValue", "");
      this.setState({ value: "" });
    }

    handleAccountClick = (event) => {
      Reaction.Router.go("account/profile", {}, { userId: event._id });
      this.handleChildUnmount();
    }

    handleTagClick = (tagId) => {
      const newFacet = tagId;
      const element = document.getElementById(tagId);
      element.classList.toggle("active-tag");

      this.setState({
        facets: tagToggle(this.state.facets, newFacet)
      });
    }

    handleToggle = (collection) => {
      this.setState({ collection });
    }

    handleChildUnmount = () =>  {
      this.setState({ renderChild: false });
    }

    handleVendorChange = (vendor) => {
      if (vendor === "all") {
        this.setState({ filterBy: {} });
      }
      this.setState({  filterBy: { vendor } });
    }

    handlePriceChange = (price) => {
      const [lowerPriceRange, upperPriceRange] = price.split("-");
      if (lowerPriceRange === "all") {
        this.setState({  filterBy: {} });
      } else {
        this.setState({
          filterBy: {
            $and: [{
              "price.min": { $gte: parseInt(lowerPriceRange, 10) },
              "price.max": { $lte: parseInt(upperPriceRange, 10) }
            }]
          }
        });
      }
    }

    handleSortChange = (value) => {
      if (value === "NEW") {
        this.setState({ sortBy: { createdAt: -1 } });
      } else if (value === "OLD") {
        this.setState({ sortBy: { createdAt: 1 } });
      } else if (value === "POPULAR") {
        this.setState({ sortBy: { quantitySold: -1 } });
      } else {
        this.setState({ sortBy: {} });
      }
    }

    render() {
      return (
        <div>
          {this.state.renderChild ?
            <div className="rui search-modal js-search-modal">
              <Comp
                handleBestSellerClick={this.handleBestSellerClick}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                handlePriceChange={this.handlePriceChange}
                handleSortChange={this.handleSortChange}
                handleToggle={this.handleToggle}
                handleVendorChange={this.handleVendorChange}
                handleAccountClick={this.handleAccountClick}
                handleTagClick={this.handleTagClick}
                value={this.state.value}
                unmountMe={this.handleChildUnmount}
                searchCollection={this.state.collection}
                facets={this.state.facets}
                filterBy={this.state.filterBy}
                sortBy={this.state.sortBy}
              />
            </div> : null
          }
        </div>
      );
    }
  }
);

registerComponent("SearchSubscription", SearchSubscription, [ wrapComponent ]);

export default compose(wrapComponent)(SearchSubscription);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handlePriceChange: PropTypes.func,
    handleSortChange: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    handleVendorChange: PropTypes.func,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string
  }

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") &&
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          }
        </div>
      );
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span
              className="rui search-tag"
              id={tag._id} key={tag._id}
              onClick={() => this.props.handleTagClick(tag._id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  getVendors() {
    const vendors = [];
    this.props.products.map((product) => {
      const vendor = product.vendor;
      if (vendors.indexOf(vendor) === -1) {
        vendors.push(vendor);
      }
    });
    return vendors;
  }

  renderVendor() {
    return (
      <div className="rui select">
        <select
          id="sort-value"
          onChange={(event) => this.props.handleVendorChange(event.target.value)}
        >
          <option value="all">All Vendors</option>
          {this.getVendors().map(vendor => <option value={vendor}>{vendor}</option>)}
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
          <div className="container">
            {this.props.value.length >= 3 && this.props.products.length < 1 && <h2><b> No product(s) found. Try some other combinations</b> </h2>}
          </div>
        </div>
        <div className="rui search-modal-results-container">
          <div className="row">
            <div className="col-md-2">
              <div id="sort">
                <div className="container sort-filter">
                  <div className="sort-div">
                    <label>Sort by New Arrivals</label>
                    <div className="rui select">
                      <select
                        id="sort-value"
                        onChange={(event) => this.props.handleSortChange(event.target.value)}
                      >
                        <option value="NULL">All</option>
                        <option value="NEW">Newest</option>
                        <option value="OLD">Oldest</option>
                      </select>
                    </div>
                  </div>
                  <div className="sort-div">
                    <label>Sort by BestSellers</label>
                    <div className="rui select">
                      <select
                        id="sort-value"
                        onClick={(event) => this.props.handleSortChange(event.target.value)}
                      >
                        <option
                          value="POPULAR"
                        >BestSeller</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter">
                    <label className="transform">Filter by Price</label>
                    <div className="rui select">
                      <select
                        id="price-filter"
                        onChange={(event) => this.props.handlePriceChange(event.target.value)}
                      >
                        <option value="all" selected>All</option>
                        <option value="0-50">Under 50</option>
                        <option value="50-100">50 - 100</option>
                        <option value="100-500">100 - 500</option>
                        <option value="500-1000">500 - 1000</option>
                        <option value="1000-above">1000 - above</option>
                      </select>
                    </div>
                  </div>
                  <div className="sort-div">
                    <label>Filter by Vendor </label>
                    {this.renderVendor()}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-10 ">
              {this.props.products.length > 0 &&
                <ProductGridContainer
                  products={this.props.products}
                  unmountMe={this.props.unmountMe}
                  isSearch={true}
                />
              }
              {this.props.accounts.length > 0 &&
                <div className="data-table">
                  <div className="table-responsive">
                    <SortableTableLegacy
                      data={this.props.accounts}
                      columns={accountsTable()}
                      onRowClick={this.props.handleAccountClick}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchModal;

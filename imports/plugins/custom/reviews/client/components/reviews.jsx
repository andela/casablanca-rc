import React, { Component } from 'react';
import '../css/reviews.css';

export default class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: '',
      reviewer: '',
      rating: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value, 'value')
    this.setState({
      rating: e.target.value
    });
  }

  handleReviewChange(e) {
    this.setState({
      review: e.target.value
    });
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
          <form action="">
            <input
              className="star star-5"
              id="star-5"
              type="radio"
              name="star"
              value="5"
              checked={this.state.rating === "5"}
              onChange={this.handleChange}
            />
            <label className="star star-5" htmlFor="star-5" />

            <input
              className="star star-4"
              id="star-4"
              type="radio"
              name="star"
              value="4"
              checked={this.state.rating === "4"}
              onChange={this.handleChange}
            />
            <label className="star star-4" htmlFor="star-4" />

            <input
              className="star star-3"
              id="star-3"
              type="radio"
              name="star"
              value="3"
              checked={this.state.rating === "3"}
              onChange={this.handleChange}
            />
            <label className="star star-3" htmlFor="star-3" />

            <input
              className="star star-2"
              id="star-2"
              type="radio"
              name="star"
              value="2"
              checked={this.state.rating === "2"}
              onChange={this.handleChange}
            />
            <label className="star star-2" htmlFor="star-2" />

            <input
              className="star star-1"
              id="star-1"
              type="radio"
              name="star"
              value="1"
              checked={this.state.rating === "1"}
              onChange={this.handleChange}
            />
            <label className="star star-1" htmlFor="star-1" />

            <div className="twenty-top-padding">
              Review <br />
              <input
                name="review"
                id="review"
                value={this.state.review}
                onChange={this.handleReviewChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

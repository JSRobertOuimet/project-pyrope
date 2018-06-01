//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Assets
import placeholderBookCoverImage from "../../../img/placeholder-book-cover-image.png";
//==================================================

class Challenges extends Component {
  render() {
    const { challenges } = this.props;
    const challengeList = challenges.map(challenge => (
      <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={challenge._id}>
        <Link to={`/challenges/${challenge._id}`}>
          <div className="card border-0">
            <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
            <div className="card-img-overlay d-flex flex-column justify-content-between">
              <div>
                <h3 className="text-white">{challenge.book.title}</h3>
                <span className="text-white">{challenge.book.author}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));

    return challengeList;
  }
}

Challenges.propTypes = {
  challenges: PropTypes.array
};

export default Challenges;
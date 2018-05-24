//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Methods
import { getChallenge } from "../../actions/challengeActions";

// Assets
import placeholderBookCoverImage from "../../img/placeholder-book-cover-image.png";

// Redux
import { connect } from "react-redux";
//==================================================

class Challenges extends Component {
  render() {
    const challenges = this.props.challenges.map(challenge => (
      <div className="col-sm-4" key={challenge._id}>
        <Link to={`/dashboard/challenges/${challenge._id}`}>
          <div className="card border-0">
            <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
            <div className="card-img-overlay d-flex flex-column justify-content-between">
              <div>
                <h3 className="text-white">{challenge.book.title}</h3>
                <span className="text-white">{challenge.book.author}</span>
              </div>
              <div className="d-flex justify-content-end">
                <span className="text-white">8 % completed</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));

    return (
      <React.Fragment>
        <h2 className="text-dark mb-3">My Challenges</h2>
        <div className="row mb-3">
          {challenges}
        </div>
        <div className="row mb-5">
          <div className="col">
            <Link to="/dashboard/create-challenge" className="btn btn-info float-right">
              Create challenge
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Challenges.propTypes = {
  challenges: PropTypes.array.isRequired
};

export default connect(null, {})(Challenges);
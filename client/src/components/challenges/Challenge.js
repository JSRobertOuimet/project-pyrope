//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Assets
import placeholderBookCoverImage from "../../img/placeholder-book-cover-image.png";

// Redux
import { connect } from "react-redux";
//==================================================

class Challenge extends Component {
  render() {
    const { challenge } = this.props.profile;
    
    return (
      <div className="row">
        <div className="col-md-4">
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
        </div>
      </div>
    );
  }
}

Challenge.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {})(Challenge);
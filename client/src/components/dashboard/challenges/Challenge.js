//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Assets
import placeholderBookCoverImage from "../../../img/placeholder-book-cover-image.png";

// Methods
import { setChallenge } from "../../../actions/challengeActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Challenge extends Component {
  componentDidMount() {
    this.props.setChallenge(this.props.match.params.challengeId);
  }

  render() {
    const { challenge, challengesLoading } = this.props.challenge;
    let challengeSection;

    if(challengesLoading === true || challenge === null) {
      challengeSection = <div className="block-center lead text-center text-muted">Fetching challenge...</div>;
    }
    else {
      challengeSection = (
        <React.Fragment>
          <div className="col-sm-4">
            <div className="card border-0">
              <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
            </div>
          </div>
          <div className="col-sm-8">
            <h3>{challenge.book.title}</h3>
            <div>{challenge.book.author}</div>
            <div>{challenge.goal.numberOfPages} pages / {challenge.goal.timePeriod}</div>
            <div>8 % completed</div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h2 className="text-dark mb-3">My Challenge</h2>
        <div className="row mb-3">
          {challengeSection}
        </div>
        <h2 className="text-dark mb-3">My Sessions</h2>
      </React.Fragment>
    );
  }
}

Challenge.propTypes = {
  match: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  setChallenge: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  challenge: state.challenge
});

export default connect(mapStateToProps, { setChallenge })(Challenge);
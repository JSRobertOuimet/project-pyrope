//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import Sessions from "../sessions/Sessions";

// Assets
import placeholderBookCoverImage from "../../../img/placeholder-book-cover-image.png";

// Methods
import { setChallenge } from "../../../actions/challengeActions";
import { setSessions } from "../../../actions/sessionActions";
import { completionPercentage } from "../../../logic/stats";

// Redux
import { connect } from "react-redux";
//==================================================

class Challenge extends Component {
  componentDidMount() {
    const challengeId = this.props.match.params.challengeId;

    Promise
      .resolve(this.props.setChallenge(challengeId))
      .then(this.props.setSessions(challengeId));
  }

  render() {
    const { challenge, challengesLoading } = this.props.challenge;
    const { sessionsLoading, sessions } = this.props.session;
    let challengeSection, sessionsSection;

    if(challengesLoading === true || sessionsLoading === true || challenge === null || sessions === null) {
      challengeSection = <div className="block-center lead text-center text-muted">Fetching challenge...</div>;
    }
    else {
      challengeSection = (
        <React.Fragment>
          <div className="col-sm-4 mb-3">
            <div className="card border-0">
              <img src={placeholderBookCoverImage} alt={challenge.book.title} className="card-img rounded-0" />
            </div>
          </div>
          <div className="col-sm-8 mb-3">
            <h3 className="display-4 n-pl">{challenge.book.title}</h3>
            <p className="lead">{challenge.book.author}</p>
            <p>{challenge.book.numberOfPages} pages</p>
            <div>{challenge.goal.numberOfPages} pages / {challenge.goal.timePeriod}</div>
            <div>{ completionPercentage(sessions, challenge.book.numberOfPages) } % completed</div>
          </div>
        </React.Fragment>
      );

      if(sessionsLoading === true || sessions === null) {
        sessionsSection = <div className="mx-auto lead text-center text-muted">Fetching sessions...</div>;
      }
      else {
        if(sessions.length === 0) {
          sessionsSection = (
            <div className="mx-auto text-center">
              <p className="lead text-muted">You don&#8217;t have any sessions yet.</p>
              <Link to={`/challenges/${challenge._id}/sessions/create`} className="btn btn-outline-info">Add your first one!</Link>
            </div>
          );
        }
        else {
          sessionsSection = <Sessions sessions={sessions} />;
        }
      }
    }


    return (
      <React.Fragment>
        <div className="row">
          {challengeSection}
        </div>
        <h2 className="my-3">My Sessions</h2>
        <div className="row mb-5">
          {sessionsSection}
        </div>
      </React.Fragment>
    );
  }
}

Challenge.propTypes = {
  match: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  setChallenge: PropTypes.func.isRequired,
  setSessions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  challenge: state.challenge,
  session: state.session
});

export default connect(mapStateToProps, { setChallenge, setSessions })(Challenge);
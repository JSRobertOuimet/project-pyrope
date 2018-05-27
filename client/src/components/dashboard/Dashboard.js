//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import Stats from "../stats/Stats";
import Challenges from "../challenges/Challenges";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";
import { setChallenges } from "../../actions/challengeActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  componentDidMount() {
    Promise
      .resolve(this.props.setCurrentProfile())
      .then(this.props.setChallenges());
  }

  render() {
    const { profile, profilesLoading } = this.props.profile;
    const { challenges, challengesLoading } = this.props.challenge;
    let content, challengeSection;

    if (profilesLoading === true) {
      content = <div className="block-center lead text-center text-muted">Fetching profile...</div>;
    }
    else {
      if (profile === null) {
        content = (
          <div className="block-center text-center">
            <p className="lead text-muted">You don&#8217;t have a profile yet.</p>
            <Link to="/profile/create" className="btn btn-outline-info">Create one!</Link>
          </div>
        );
      }
      else {
        if (challengesLoading === true) {
          challengeSection = <div className="block-center lead text-center text-muted">Fetching challenges...</div>;
        }
        else {
          challengeSection = <Challenges challenges={challenges} />;
        }
        content = (
          <React.Fragment>
            <Stats />
            {challengeSection}
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  setChallenges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  challenge: state.challenge
});

export default connect(mapStateToProps, { setCurrentProfile, setChallenges })(Dashboard);
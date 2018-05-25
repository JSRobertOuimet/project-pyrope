//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import Challenges from "../challenges/Challenges";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";
import { setChallenges } from "../../actions/challengeActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  componentDidMount() {
    this.props.setCurrentProfile();
    this.props.setChallenges();
  }

  render() {
    const { profile, profileLoading } = this.props.profile;
    const { challenges, challengesLoading } = this.props.challenge;
    let content;

    if(profileLoading === true) {
      content = <div className="block-center lead text-center text-muted">Fetching profile...</div>;
    }
    else {
      if(profile === null) {
        content = (
          <React.Fragment>
            <div className="block-center text-center">
              <p className="lead text-muted">You don&#8217;t have a profile yet.</p>
              <Link to="/dashboard/create-profile" className="btn btn-outline-info">Create one!</Link>
            </div>
          </React.Fragment>
        );
      }
      else {
        if(challengesLoading === true) {
          content = <div className="block-center lead text-center text-muted">Fetching Challenges...</div>;
        }
        else {
          content = "Challenges!";
        }
        content = (
          <React.Fragment>
            <h2 className="text-dark mb-3">My Stats</h2>
            <div className="row mb-5">
              <div className="col-sm-3">
                <div className="card text-center">
                  <div className="card-body">
                    <div className="display-3 text-dark">25</div>
                    <div className="text-muted">avg. pages read / day</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card text-center">
                  <div className="card-body">
                    <div className="display-3 text-dark">3</div>
                    <div className="text-muted">authors read</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card text-center">
                  <div className="card-body">
                    <div className="display-3 text-dark">7</div>
                    <div className="text-muted">books read</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card text-center">
                  <div className="card-body">
                    <div className="display-3 text-dark">2</div>
                    <div className="text-muted">challenges completed</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Challenges challenges={challenges} /> */}
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  setChallenges: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  challenge: state.challenge
});

export default connect(mapStateToProps, { setCurrentProfile, setChallenges })(Dashboard);
//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import Challenges from "../challenges/Challenges";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  componentDidMount() {
    this.props.setCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    let content;

    if (loading === true) {
      content = <span>Loading...</span>;
    }
    else {
      if (profile === null) {
        content = (
          <React.Fragment>
            <div className="text-center cta-create-profile">
              <p className="lead text-muted">You don&#8217;t have a profile yet...</p>
              <Link to="/dashboard/create-profile" className="btn btn-outline-info">Create one!</Link>
            </div>
          </React.Fragment>
        );
      }
      else {
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
            <Challenges challenges={profile.challenges} />
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
  setCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { setCurrentProfile })(Dashboard);
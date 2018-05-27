//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Stats from "../stats/Stats";
import Challenges from "../challenges/Challenges";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";
import { setChallenges } from "../../actions/challengeActions";
import { createProfile } from "../../actions/profileActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      about: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    Promise
      .resolve(this.props.setCurrentProfile())
      .then(this.props.setChallenges());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    const newProfile = {
      username: this.state.username,
      about: this.state.about
    };

    e.preventDefault();

    this.props.createProfile(newProfile);
  }

  render() {
    const { errors } = this.state;
    const { profile, profilesLoading } = this.props.profile;
    const { challenges, challengesLoading } = this.props.challenge;
    let content, challengeSection, modalContent;

    if (profilesLoading === true) {
      content = <div className="block-center lead text-center text-muted">Fetching profile...</div>;
    }
    else {
      if (profile === null) {
        content = (
          <div className="block-center text-center">
            <p className="lead text-muted">You don&#8217;t have a profile yet.</p>
            <button className="btn btn-outline-info" data-toggle="modal" data-target="#createProfileModal">Create one!</button>
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

    modalContent = (
      <React.Fragment>
        {errors.message && (<div className="alert alert-danger text-center" role="alert">{errors.message}</div>)}
        <TextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={this.state.username}
          error={errors.username}
          onChange={this.onChange}
        />
        <TextArea
          label="About"
          type="text"
          id="about"
          name="about"
          value={this.state.about}
          error={errors.about}
          onChange={this.onChange}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {content}
        <Modal title="Create Challenge" content={modalContent} onSubmit={this.onSubmit} action="Create" />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  challenge: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  setChallenges: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  challenge: state.challenge
});

export default connect(mapStateToProps, { setCurrentProfile, setChallenges, createProfile })(Dashboard);
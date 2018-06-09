//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import Checkbox from "../common/Checkbox";
import AddCard from "../common/AddCard";
import Stats from "./stats/Stats";
import Challenges from "./challenges/Challenges";

// Methods
import { clearErrors } from "../../actions/errorActions";
import { setCurrentProfile } from "../../actions/profileActions";
import { setChallenges } from "../../actions/challengeActions";
import { setSessions } from "../../actions/sessionActions";
import { createProfile } from "../../actions/profileActions";
import { createChallenge } from "../../actions/challengeActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      about: "",
      publicProfile: true,

      author: "",
      title: "",
      bookNumberOfPages: "",
      goalNumberOfPages: "",
      goalTimePeriod: "day",
      publicChallenge: true,

      errors: {},

      createProfileModal: false,
      createChallengeModal: false,
    };

    // Modals
    this.toggleCreateProfileModal = this.toggleCreateProfileModal.bind(this);
    this.toggleCreateChallengeModal = this.toggleCreateChallengeModal.bind(this);

    // Forms
    this.onChange = this.onChange.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.createChallenge = this.createChallenge.bind(this);
  }

  componentDidMount() {
    Promise
      .resolve(this.props.setCurrentProfile())
      .then(this.props.setChallenges());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleCreateProfileModal() {
    this.setState({
      username: "",
      about: "",
      publicProfile: true,
      createProfileModal: !this.state.createProfileModal,
    });

    if(this.state.errors) {
      this.props.clearErrors();
    }
  }

  toggleCreateChallengeModal() {
    this.setState({
      author: "",
      title: "",
      bookNumberOfPages: "",
      goalNumberOfPages: "",
      goalTimePeriod: "day",
      publicChallenge: true,
      createChallengeModal: !this.state.createChallengeModal,
    });

    if(this.state.errors) {
      this.props.clearErrors();
    }
  }

  onChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({ [e.target.name] : value });
  }

  createProfile(e) {
    const newProfile = {
      username: this.state.username,
      about: this.state.about,
      publicProfile: this.state.publicProfile
    };

    e.preventDefault();
    this.props.clearErrors();
    this.props.createProfile(newProfile);

    setTimeout(() => {
      if(!(this.state.errors.username || this.state.errors.about)) {
        this.toggleCreateProfileModal();
      }
    }, 2000);
  }

  createChallenge(e) {
    const newChallenge = {
      author: this.state.author,
      title: this.state.title,
      bookNumberOfPages: Number(this.state.bookNumberOfPages),
      goalNumberOfPages: Number(this.state.goalNumberOfPages),
      goalTimePeriod: this.state.goalTimePeriod,
      publicChallenge: this.state.publicChallenge
    };

    e.preventDefault();
    this.props.clearErrors();
    this.props.createChallenge(newChallenge);

    setTimeout(() => {
      if(!(this.state.errors.title || this.state.errors.author || this.state.errors.bookNumberOfPages || this.state.errors.goalumberOfPages)) {
        Promise
          .resolve(this.props.setCurrentProfile())
          .then(this.props.setChallenges())
          .then(this.toggleCreateChallengeModal());
      }
    }, 2000);
  }

  render() {
    const
      { errors } = this.state,
      { profile, profilesLoading } = this.props.profile,
      { challenges, challengesLoading } = this.props.challenge,
      timePeriodOptions = [ { label: "day", value: "day" }, { label: "week", value: "week" } ];
    let content;

    if(profilesLoading === true || challengesLoading === true || profile === null || challenges === null) {
      content = <div className="block-center lead text-center text-muted">Fetching profile...</div>;
    }
    else {
      if(profile === null) {
        content = (
          <div className="block-center text-center">
            <p className="lead text-muted">You don&#8217;t have a profile yet.</p>
            <button onClick={this.toggleCreateProfileModal} className="btn btn-outline-dark">Create one!</button>
          </div>
        );
      }
      else {
        content = (
          <React.Fragment>
            <h2 className="mb-3">My Stats</h2>
            <div className="row">
              { challenges === null ? null : <Stats challenges={challenges} /> }
            </div>
            <h2 className="mb-3 mt-3">My Challenges { challenges.length > 0 ? <small className="text-black-50">({challenges.length})</small> : null }</h2>
            <div className="row">
              { challenges.length > 0 ? <Challenges challenges={challenges} /> : null }
              <AddCard onClick={this.toggleCreateChallengeModal} />
            </div>
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        {content}
        <Modal isOpen={this.state.createProfileModal} toggle={this.toggleCreateProfileModal}>
          <form onSubmit={this.createProfile} noValidate>
            <ModalHeader toggle={this.toggleCreateProfileModal}>Create Profile</ModalHeader>
            <ModalBody>
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
                id="about"
                name="about"
                value={this.state.about}
                error={errors.about}
                onChange={this.onChange}
              />
              <Checkbox
                label="Public"
                id="publicProfile"
                name="publicProfile"
                checked={this.state.publicProfile}
                onChange={this.onChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button outline color="dark" onClick={this.toggleCreateProfileModal}>Cancel</Button>
              <input type="submit" className="btn btn-dark" value="Create Profile" />
            </ModalFooter>
          </form>
        </Modal>
        <Modal isOpen={this.state.createChallengeModal} toggle={this.toggleCreateChallengeModal}>
          <form onSubmit={this.createChallenge} noValidate>
            <ModalHeader toggle={this.toggleCreateChallengeModal}>Create Challenge</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col">
                  <p className="lead">Book</p>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="Title"
                        type="text"
                        id="title"
                        name="title"
                        value={this.state.title}
                        error={errors.title}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="Author"
                        type="text"
                        id="author"
                        name="author"
                        value={this.state.author}
                        error={errors.author}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="Number of pages"
                        type="number"
                        id="bookNumberOfPages"
                        name="bookNumberOfPages"
                        value={this.state.bookNumberOfPages}
                        error={errors.bookNumberOfPages}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">Goal</p>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <TextInput
                        label="Number of pages"
                        type="number"
                        id="goalNumberOfPages"
                        name="goalNumberOfPages"
                        value={this.state.goalNumberOfPages}
                        error={errors.goalNumberOfPages}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <SelectInput
                        label="Time Period"
                        options={timePeriodOptions}
                        id="goalTimePeriod"
                        name="goalTimePeriod"
                        value={this.state.goalTimePeriod}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <Checkbox
                    label="Public"
                    id="publicChallenge"
                    name="publicChallenge"
                    checked={this.state.publicChallenge}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button outline color="dark" onClick={this.toggleCreateChallengeModal}>Cancel</Button>
              <input type="submit" className="btn btn-dark" value="Create Challenge" />
            </ModalFooter>
          </form>
        </Modal>
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
  setSessions: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  createChallenge: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  challenge: state.challenge,
  sessions: state.sessions
});

export default connect(mapStateToProps, { setCurrentProfile, setChallenges, setSessions, createProfile, createChallenge, clearErrors })(Dashboard);
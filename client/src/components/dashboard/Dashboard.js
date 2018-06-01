//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// ReactStrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Checkbox from "../common/Checkbox";
import Stats from "./stats/Stats";
import Challenges from "./challenges/Challenges";

// Methods
import { clearErrors } from "../../actions/errorActions";
import { setCurrentProfile } from "../../actions/profileActions";
import { setChallenges } from "../../actions/challengeActions";
import { setSessions } from "../../actions/sessionActions";
import { createChallenge } from "../../actions/challengeActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: "",
      title: "",
      bookNumberOfPages: "",
      goalNumberOfPages: "",
      goalTimePeriod: "day",
      public: true,
      errors: {},
      modal: false
    };

    this.onChange = this.onChange.bind(this);
    this.onToggleChange = this.onToggleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    Promise
      .resolve(this.props.setCurrentProfile())
      .then(this.props.setChallenges());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      errors: {}
    });
    this.props.clearErrors();
  }

  onToggleChange() {
    this.setState({
      public: !this.state.public
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    const newChallenge = {
      author: this.state.author,
      title: this.state.title,
      bookNumberOfPages: Number(this.state.bookNumberOfPages),
      goalNumberOfPages: Number(this.state.goalNumberOfPages),
      goalTimePeriod: this.state.goalTimePeriod,
      public: this.state.public
    };

    e.preventDefault();

    this.props.createChallenge(newChallenge);
  }

  render() {
    const { errors } = this.state;
    const { profile, profilesLoading } = this.props.profile;
    const { challenges, challengesLoading } = this.props.challenge;
    const timePeriodOptions = [
      { label: "day", value: "day" },
      { label: "week", value: "week" },
    ];
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
          challengeSection = (
            <React.Fragment>
              <h2 className="mb-3 mt-3">My Challenges</h2>
              <div className="row">
                <Challenges challenges={challenges} />
                <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                  <a className="card bg-light create-challenge d-flex justify-content-center align-items-center" onClick={this.toggle}>
                    <i className="position-absolute fas fa-plus-circle fa-2x"></i>
                  </a>
                </div>
              </div>
            </React.Fragment>
          );
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.onSubmit} noValidate>
            <ModalHeader toggle={this.toggle}>Create Challenge</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col">
                  <p className="h5">Book</p>
                  <TextInput
                    label="Title"
                    type="text"
                    id="title"
                    name="title"
                    value={this.state.title}
                    error={errors.title}
                    onChange={this.onChange}
                  />
                  <TextInput
                    label="Author"
                    type="text"
                    id="author"
                    name="author"
                    value={this.state.author}
                    error={errors.author}
                    onChange={this.onChange}
                  />
                  <div className="row">
                    <div className="col-6">
                      <TextInput
                        label="Number of pages"
                        type="number"
                        id="bookNumberOfPages"
                        name="bookNumberOfPages"
                        value={this.state.bookNumberOfPages}
                        error={errors.numberOfPages}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <p className="h5">Goal</p>
                  <div className="row">
                    <div className="col">
                      <TextInput
                        label="Number of pages"
                        type="number"
                        id="goalNumberOfPages"
                        name="goalNumberOfPages"
                        value={this.state.goalNumberOfPages}
                        error={errors.numberOfPages}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col">
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
                    id="public"
                    name="public"
                    checked={this.state.public}
                    onChange={this.onToggleChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
              <input type="submit" className="btn btn-success" onClick={this.toggle} value="Create" />
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
  setCurrentProfile: PropTypes.func.isRequired,
  setChallenges: PropTypes.func.isRequired,
  setSessions: PropTypes.func.isRequired,
  createChallenge: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  challenge: state.challenge,
  sessions: state.sessions
});

export default connect(mapStateToProps, { setCurrentProfile, setChallenges, setSessions, createChallenge, clearErrors })(Dashboard);
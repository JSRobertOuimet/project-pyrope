//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Components
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
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

    this.toggle = this.toggle.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      author: "",
      title: "",
      bookNumberOfPages: "",
      goalNumberOfPages: "",
      goalTimePeriod: "day",
      public: true,
      modal: !this.state.modal,
    });

    if(this.state.errors) {
      this.props.clearErrors();
    }
  }

  toggleCheckbox() {
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
    this.props.clearErrors();
    this.props.createChallenge(newChallenge);

    setTimeout(() => {
      if(!(this.state.errors.title || this.state.errors.author || this.state.errors.numberOfPages)) {
        this.toggle();
      }
    }, 2000);
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
                { challenges ? <Challenges challenges={challenges} /> : null }
                <AddCard onClick={this.toggle} />
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
                  <p className="lead">Book</p>
                  <div className="row">
                    <div className="col">
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
                    <div className="col">
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
                  <hr/>
                  <p className="lead">Goal</p>
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
                    onChange={this.toggleCheckbox}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
              <input type="submit" className="btn btn-success" value="Create" />
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
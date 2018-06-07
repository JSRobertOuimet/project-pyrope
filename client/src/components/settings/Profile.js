//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Checkbox from "../common/Checkbox";
import SubmitButton from "../common/SubmitButton";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";
import { createProfile } from "../../actions/profileActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      about: "",
      public: false,
      errors: {}
    };

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      this.setState({
        username: profile.username,
        email: profile.email,
        about: profile.about,
        public: profile.public
      });
    }
  }

  toggleCheckbox() {
    this.setState({
      public: !this.state.public
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  onSubmit(e) {
    const updatedProfile = {
      username: this.state.username,
      email: this.state.email,
      about: this.state.about,
      public: this.state.public
    };

    e.preventDefault();
    this.props.createProfile(updatedProfile);
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.onSubmit} noValidate>
              <TextInput
                label="Username"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                error={errors.username}
                onChange={this.onChange}
              />
              <TextInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                error={errors.email}
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
                id="public"
                name="public"
                checked={(this.state.public)}
                onChange={this.toggleCheckbox}
              />
              <SubmitButton
                buttonType="dark"
                value="Save Changes"
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { setCurrentProfile, createProfile })(Profile);
//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

// Components
import TextInput from "../common/inputs/TextInput";
import TextArea from "../common/inputs/TextArea";
import Checkbox from "../common/inputs/Checkbox";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";
import { createProfile } from "../../actions/profileActions";
import { deleteProfile } from "../../actions/profileActions";

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

    // Form
    this.onChange = this.onChange.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
  }

  componentDidMount() {
    this.props.setCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

  onChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({ [e.target.name] : value });
  }

  deleteProfile() {
    this.props.deleteProfile();
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.updateProfile} noValidate>
              <TextInput
                label="Username"
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                error={errors.username}
                onChange={this.onChange}
                disabled={true}
              />
              <TextInput
                label="Email"
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                error={errors.email}
                onChange={this.onChange}
                disabled={true}
              />
              <TextArea
                label="About"
                id="about"
                name="about"
                value={this.state.about}
                error={errors.about}
                onChange={this.onChange}
                disabled={true}
              />
              <Checkbox
                label="Public"
                id="public"
                name="public"
                checked={this.state.public}
                onChange={this.onChange}
                disabled={true}
              />
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button outline color="danger" onClick={this.deleteProfile}>Delete your Profile</Button>
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
  createProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { setCurrentProfile, createProfile, deleteProfile })(Profile);
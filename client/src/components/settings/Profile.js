//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import SubmitButton from "../common/SubmitButton";

// Methods
import { setCurrentProfile } from "../../actions/profileActions";

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
      newPassword: "",
      confirmPassword: "",
      errors: {}
    };

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

      profile.username = profile.profile.username;
      profile.email = profile.email;
      profile.about = profile.profile.about;

      this.setState({
        username: profile.username,
        email: profile.email,
        about: profile.about
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  onSubmit() {

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
                type="text"
                id="about"
                name="about"
                value={this.state.about}
                error={errors.about}
                onChange={this.onChange}
              >
              </TextArea>
              <TextInput
                label="New Password"
                type="password"
                id="newPassword"
                name="newPassword"
                value={this.state.newPassword}
                error={errors.newPassword}
                onChange={this.onChange}
              />
              <TextInput
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={this.state.confirmPassword}
                error={errors.confirmPassword}
                onChange={this.onChange}
              />
              <SubmitButton
                buttonType="success"
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  setCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { setCurrentProfile })(Profile);
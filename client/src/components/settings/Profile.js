//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import TextInput from "../common/TextInput";
import SubmitButton from "../common/SubmitButton";

// Redux
import { connect } from "react-redux";
//==================================================

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { })(Profile);
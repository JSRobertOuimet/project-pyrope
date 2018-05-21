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

class Account extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      errors: {}
    };
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <h1 className="text-dark mb-3">My Account</h1>
        <div className="row">
          <div className="col-sm-4">
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
          </div>
        </div>
      </React.Fragment> 
    );
  }
}

Account.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, {  })(Account);
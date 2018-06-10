//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SubmitButton from "../common/SubmitButton";

// Methods
import { resetPassword } from "../../actions/authActions";

// Redux
import { connect } from "react-redux";
//==================================================

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  resetPassword(e) {
    e.preventDefault();

    console.log("TODO: add call to /reset-password");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="card mb-2">
            <div className="card-body">
              <h1 className="card-title h3 text-center">Reset Password</h1>
              <form onSubmit={this.resetPassword} noValidate>
                <TextInput
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={this.state.email}
                  error={errors.email}
                  onChange={this.onChange}
                />
                <SubmitButton
                  buttonType="dark"
                  block="block"
                  value="Send reset link"
                />
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to="/auth/sign-in">Not what you are looking for? Sign in!</Link>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  errors: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
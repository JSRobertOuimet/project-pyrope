//==================================================
// React
import React, { Component } from "react";
import propTypes from "prop-types";

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
  constructor() {
    super();

    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    const { email } = this.state;

    e.preventDefault();

    this.props.resetPassword(email);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="col-sm-8 col-md-6 col-lg-4 mt-5">
        <div className="card mb-1">
          <div className="card-body">
            <h1 className="card-title h3 text-center">Reset Password</h1>
            <form onSubmit={this.onSubmit} noValidate>
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
                buttonType="secondary"
                block="block"
                value="Send Reset Link"
              />
            </form>
          </div>
        </div>
        <Link to="/auth/sign-in">Sign In</Link>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  errors: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
  resetPassword: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
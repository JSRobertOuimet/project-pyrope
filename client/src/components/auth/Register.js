//==================================================
// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SubmitButton from "../common/SubmitButton";

// Methods
import { registerUser } from "../../actions/authActions";

// Redux
import { connect } from "react-redux";
//==================================================

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="col-md-6 col-lg-4 mt-5">
        <div className="card mb-1">
          <div className="card-body">
            <h1 className="card-title h3 text-center">Register</h1>
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
              <TextInput
                label="Password"
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                error={errors.password}
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
                buttonType="secondary"
                block="block"
                value="Register"
              />
            </form>
          </div>
        </div>
        <Link to="/auth/reset-password">Forgot password?</Link>
        <Link to="/auth/sign-in" className="float-right">Sign In</Link>
      </div>
    );
  }
}

Register.propTypes = {
  errors: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  registerUser: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
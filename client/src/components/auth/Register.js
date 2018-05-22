//==================================================
// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    e.preventDefault();

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
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
                  buttonType="success"
                  block="block"
                  value="Register"
                />
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to="/auth/sign-in">Have an account? Sign In!</Link>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
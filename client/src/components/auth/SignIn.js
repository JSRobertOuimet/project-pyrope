//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SubmitButton from "../common/SubmitButton";

// Methods
import { signInUser } from "../../actions/authActions";

// Redux
import { connect } from "react-redux";
//==================================================

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
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
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signInUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4">
          {errors.emailOrPassword && (<div className="alert alert-danger text-center" role="alert">{errors.emailOrPassword}</div>)}
          <div className="card mb-2">
            <div className="card-body">
              <h1 className="card-title h3 text-center">Sign In</h1>
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
                <SubmitButton
                  buttonType="dark"
                  block="block"
                  value="Sign In"
                />
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link to="/auth/register">Don&#8217;t have an account? Register!</Link>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signInUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { signInUser })(SignIn);
//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";

// Methods
import { signOutUser } from "../../actions/authActions";

// Assets
import PPLogo from "../../img/pp-logo.svg";

// Redux
import { connect } from "react-redux";
//==================================================

class Navbar extends Component {
  onSignOutUserClick(e) {
    e.preventDefault();

    this.props.signOutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/auth/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/auth/sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    );

    const userLinks = (
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/browse">Browse</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/account">My Account</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={this.onSignOutUserClick.bind(this)}>Sign Out</a>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container">
          <Link to="/" className="d-flex align-items-center mr-3">
            <img src={PPLogo} alt="Project Pyrope"/>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  signOutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signOutUser })(Navbar);
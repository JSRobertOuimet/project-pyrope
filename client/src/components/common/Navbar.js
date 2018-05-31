//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import { Link } from "react-router-dom";

// Methods
import { signOutUser } from "../../actions/authActions";

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
            <Link className="nav-link" to="/connect">Connect</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              More
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/settings">Settings</Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="" onClick={this.onSignOutUserClick.bind(this)}>Sign Out</a>
            </div>
          </li>
        </ul>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container">
          <Link to={ isAuthenticated ? "/dashboard" : "/" } className="logo d-flex align-items-center mr-4">
            PP
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
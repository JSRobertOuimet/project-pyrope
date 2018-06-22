import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 className="display-1">Project Pyrope</h1>
          <p className="lead mb-5">Set reading goals, create book clubs, and share your progress with your friends.</p>
          <Link to="/auth/register" className="btn btn-dark mr-2">Register</Link>
          <Link to="/auth/sign-in" className="btn btn-outline-dark">Sign In</Link>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="far fa-calendar-check fa-5x mb-3"></i>
                <h2 className="card-title">Set reading goals</h2>
                <p className="card-text">Pick your book, and set the number of pages to read daily or weekly.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="far fa-calendar-check fa-5x mb-3"></i>
                <h2 className="card-title">Set reading goals</h2>
                <p className="card-text">Pick your book, and set the number of pages to read daily or weekly.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="far fa-calendar-check fa-5x mb-3"></i>
                <h2 className="card-title">Set reading goals</h2>
                <p className="card-text">Pick your book, and set the number of pages to read daily or weekly.</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
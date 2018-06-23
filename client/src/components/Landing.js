import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 className="display-1">Project Pyrope</h1>
          <p className="lead mb-5">Set reading goals, create book clubs, and share your progress with your friends.</p>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="far fa-calendar-check fa-4x mb-3"></i>
                <h2 className="card-title">Set reading goals</h2>
                <p className="card-text">Pick your book, and set the number of pages to read daily or weekly.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-users fa-4x mb-3"></i>
                <h2 className="card-title">Create book clubs</h2>
                <p className="card-text">Make friends and create a common challenge around one or more books.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <i className="fas fa-chart-line fa-4x mb-3"></i>
                <h2 className="card-title">Share your progress</h2>
                <p className="card-text">Create new habits and stay motivated by showing your reading statistics.</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Landing;
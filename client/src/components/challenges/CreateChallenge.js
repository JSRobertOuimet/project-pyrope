//==================================================
// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
//==================================================

class CreateChallenge extends Component {
  render() {
    return (
      <div className="col-sm-3">
        <Link to="/dashboard/create-challenge" className="text-dark no-underline">
          <div className="card bg-light create-challenge d-flex justify-content-center align-items-center">
            <i className="position-absolute fas fa-plus-circle fa-2x"></i>
          </div>
        </Link>
      </div>
    );
  }
}

export default CreateChallenge;
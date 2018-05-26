//==================================================
// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
//==================================================

class CreateChallenge extends Component {
  render() {
    return (
      <div className="col-sm-4">
        <Link to="/dashboard/create-challenge" className="text-secondary no-underline">
          <div className="card create-challenge rounded-0 border border-secondary d-flex justify-content-center align-items-center">
            <i className="position-absolute fas fa-plus fa-2x"></i>
          </div>
        </Link>
      </div>
    );
  }
}

export default CreateChallenge;
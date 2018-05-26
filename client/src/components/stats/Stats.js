//==================================================
// React
import React, { Component } from "react";
//==================================================

class Stats extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="text-dark mb-3">My Stats</h2>
        <div className="row mb-5">
          <div className="col-sm-3">
            <div className="card text-center">
              <div className="card-body">
                <div className="display-3 text-dark">25</div>
                <div className="text-muted">avg. pages read / day</div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-center">
              <div className="card-body">
                <div className="display-3 text-dark">3</div>
                <div className="text-muted">authors read</div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-center">
              <div className="card-body">
                <div className="display-3 text-dark">7</div>
                <div className="text-muted">books read</div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card text-center">
              <div className="card-body">
                <div className="display-3 text-dark">2</div>
                <div className="text-muted">challenges completed</div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Stats;
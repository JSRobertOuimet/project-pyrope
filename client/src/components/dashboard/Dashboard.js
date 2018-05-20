//==================================================
// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Assets
import bookImg1 from "../../img/book-image-1.jpg";
import bookImg2 from "../../img/book-image-2.jpg";
import bookImg3 from "../../img/book-image-3.jpg";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="text-dark mb-3">My Stats</h2>
        <div className="row">
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
        <h2 className="text-dark mt-5 mb-3">My Challenges</h2>
        <div className="row mb-5">
          <div className="col-sm-4">
            <div className="card border-0">
              <img src={bookImg1} alt="[Book Title]" className="card-img rounded-0"/>
              <div className="card-img-overlay d-flex flex-column justify-content-between">
                <div>
                  <h3>
                    <a href="" className="text-white">Microinteractions</a>
                  </h3>
                  <a href="" className="text-white">Dan Saffer</a>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">8 % completed</span>
                  <Link to="" className="btn btn-outline-light">Add Session</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card border-0">
              <img src={bookImg2} alt="[Book Title]" className="card-img rounded-0"/>
              <div className="card-img-overlay d-flex flex-column justify-content-between">
                <div>
                  <h3>
                    <a href="" className="text-white">Oliver Twist</a>
                  </h3>
                  <a href="" className="text-white">Charles Dickens</a>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">Start challenge!</span>
                  <Link to="" className="btn btn-outline-light">Add Session</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card border-0">
              <img src={bookImg3} alt="[Book Title]" className="card-img rounded-0"/>
              <div className="card-img-overlay d-flex flex-column justify-content-between">
                <div>
                  <h3>
                    <a href="" className="text-white">Le Rouge et le Noir</a>
                  </h3>
                  <a href="" className="text-white">Stendhal</a>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">34 % completed</span>
                  <Link to="" className="btn btn-outline-light">Add Session</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {})(Dashboard);
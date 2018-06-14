//==================================================
// React
import React, { Component } from "react";

// Components
import Profile from "../settings/Profile";
//==================================================

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2 className="mb-3">My Profile</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane show active" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <Profile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Settings;
//==================================================
// React
import React, { Component } from "react";

// Components
import Sidebar from "../common/Sidebar";
import Profile from "../settings/Profile";
//==================================================

class Settings extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-9 offset-sm-3">
            <h2 className="text-dark mb-3">My Profile</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="card">
              <div className="card-body">
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane show active" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <Profile />
                  </div>
                  <div className="tab-pane" id="list-friends" role="tabpanel" aria-labelledby="list-friends-list">
                    Friends
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
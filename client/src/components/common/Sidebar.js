//==================================================
// React
import React from "react";
import { Link } from "react-router-dom";
//==================================================

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="list-group" id="list-tab" role="tablist">
        <Link className="list-group-item list-group-item-action active" id="list-profile-list" data-toggle="list" to="#list-profile" role="tab" aria-controls="profile">Profile</Link>
        <Link className="list-group-item list-group-item-action" id="list-friends-list" data-toggle="list" to="#list-friends" role="tab" aria-controls="friends">Friends</Link>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
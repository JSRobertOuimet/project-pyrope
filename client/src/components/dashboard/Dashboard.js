//==================================================
// React
import React, { Component } from "react";

// Redux
import { connect } from "react-redux";
//==================================================

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    );
  }
}

export default connect(null, {})(Dashboard);
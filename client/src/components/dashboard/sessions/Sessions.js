//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Other
import Moment from "react-moment";
//==================================================

class Sessions extends Component {
  render() {
    const { sessions } = this.props;
    const sessionList = sessions.map(session => (
      <tr key={session._id}>
        <td>
          <Moment format="MMMM Do, YYYY @ h:mm A">
            {session.date}
          </Moment>
        </td>
        <td>{session.numberOfPagesRead}</td>
        <td>{session.notes}</td>
      </tr>
    ));

    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Pages Read</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {sessionList}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Sessions.propTypes = {
  sessions: PropTypes.array
};

export default Sessions;
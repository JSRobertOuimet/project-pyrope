//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import DataCard from "../../common/cards/DataCard";

// Methods
import {
  averagePagesReadPerDay,
  averageSessionsPerWeek,
  challengesCompleted,
  authorsRead
} from "../../../logic/stats";
//==================================================

class Stats extends Component {
  render() {
    const
      { challenges, sessions } = this.props,
      s1 = averagePagesReadPerDay(sessions),
      s2 = averageSessionsPerWeek(sessions),
      s3 = authorsRead(challenges),
      s4 = challengesCompleted(challenges);
    let authorsReadLabel = s3 < 2 ? "author read" : "authors read";
    let challengesCompletedLabel = s4 < 2 ? "challenge completed" : "challenges completed";

    return (
      <React.Fragment>
        <DataCard label="avg. pages read / session" value={s1} />
        <DataCard label="avg. sessions / week" value={s2} />
        <DataCard label={authorsReadLabel} value={s3} />
        <DataCard label={challengesCompletedLabel} value={s4} />
      </React.Fragment>
    );
  }
}

Stats.propTypes = {
  challenges: PropTypes.array,
  sessions: PropTypes.array
};

export default Stats;
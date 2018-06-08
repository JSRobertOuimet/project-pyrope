//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import DataCard from "../../common/DataCard";

// Methods
import { challengesCompleted } from "../../../logic/stats";
//==================================================

class Stats extends Component {
  render() {
    const 
      { challenges } = this.props,
      completed = challengesCompleted(challenges);

    const data = {
      avgPagesReadByDay: 25,
      avgSessionsByWeek: 12,
      authorsRead: 3,
      challengesCompleted: completed
    };

    return (
      <React.Fragment>
        <DataCard label="avg. pages read / day" value={data.avgPagesReadByDay} />
        <DataCard label="avg. sessions / week" value={data.avgSessionsByWeek} />
        <DataCard label="authors read" value={data.authorsRead} />
        <DataCard label="challenges completed" value={data.challengesCompleted} />
      </React.Fragment>
    );
  }
}

Stats.propTypes = {
  challenges: PropTypes.array
};

export default Stats;
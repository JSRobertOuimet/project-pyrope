//==================================================
// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import DataCard from "../../common/DataCard";

// Methods
import { challengesCompleted, authorsRead } from "../../../logic/stats";
//==================================================

class Stats extends Component {
  render() {
    const 
      { challenges } = this.props,
      s3 = authorsRead(challenges),
      s4 = challengesCompleted(challenges);

    return (
      <React.Fragment>
        {/* <DataCard label="avg. pages read / day" value={avgPagesReadByDay} />
        <DataCard label="avg. sessions / week" value={avgSessionsByWeek} /> */}
        <DataCard label="authors read" value={s3} />
        <DataCard label="challenges completed" value={s4} />
      </React.Fragment>
    );
  }
}

Stats.propTypes = {
  challenges: PropTypes.array
};

export default Stats;
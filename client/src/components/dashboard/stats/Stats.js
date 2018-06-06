//==================================================
// React
import React, { Component } from "react";

// Components
import DataCard from "../../common/DataCard";
//==================================================

class Stats extends Component {
  render() {
    const data = {
      avgPagesReadByDay: 25,
      authorsRead: 3,
      booksRead: 7,
      challengesCompleted: 2
    };

    return (
      <React.Fragment>
        <DataCard label="avg. pages read / day" value={data.avgPagesReadByDay} />
        <DataCard label="authors read" value={data.authorsRead} />
        <DataCard label="books read" value={data.booksRead} />
        <DataCard label="challenges completed" value={data.challengesCompleted} />
      </React.Fragment>
    );
  }
}

export default Stats;
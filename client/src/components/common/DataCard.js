//==================================================
// React
import React from "react";
import PropTypes from "prop-types";
//==================================================

const Data = ({ label, value }) => {
  return (
    <div className="col-sm-3">
      <div className="card text-center">
        <div className="card-body">
          <div className="display-3 text-dark">{value}</div>
          <div className="text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
};

Data.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Data;
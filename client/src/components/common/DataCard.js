//==================================================
// React
import React from "react";
import PropTypes from "prop-types";
//==================================================

const DataCard = ({ label, value }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="card text-center">
        <div className="card-body">
          <div className="display-3">{value}</div>
          <div className="text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
};

DataCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default DataCard;
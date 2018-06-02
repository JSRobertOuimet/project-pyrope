//==================================================
// React
import React from "react";
import PropTypes from "prop-types";
//==================================================

const AddCard = ({ onClick }) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <a className="card bg-light create-challenge d-flex justify-content-center align-items-center" onClick={onClick}>
        <i className="position-absolute fas fa-plus-circle fa-2x"></i>
      </a>
    </div>
  );
};

AddCard.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AddCard;
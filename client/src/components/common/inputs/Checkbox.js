//==================================================
// React
import React from "react";
import PropTypes from "prop-types";
//==================================================

const Checkbox = ({ label, name, checked, onChange, disabled }) => {
  return (
    <div className="form-group">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="form-check-label" htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Checkbox;
//==================================================
// React
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
//==================================================

const TextInput = ({ label, type, name, value, placeholder, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        className={classnames("form-control", { "is-invalid": error })}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
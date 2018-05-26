//==================================================
// React
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
//==================================================

const TextArea = ({ label, name, value, placeholder, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classnames("form-control", { "is-invalid": error })}
        onChange={onChange}
      >
      </textarea>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
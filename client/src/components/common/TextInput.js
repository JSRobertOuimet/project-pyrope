import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const TextInput = ({ label, type, name, value, placeholder, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classnames("form-control", { "is-invalid": error })}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string,
  placeholder: propTypes.string,
  error: propTypes.string,
  onChange: propTypes.func.isRequired
};

export default TextInput;
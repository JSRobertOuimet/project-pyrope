//==================================================
// React
import React from "react";
import PropTypes from "prop-types";
//==================================================

const SelectInput = ({
  label,
  options,
  id,
  name,
  value,
  onChange
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={id}
        className="custom-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectInput;
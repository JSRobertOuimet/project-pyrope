import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SubmitButton = ({ buttonType, block, value, disabled }) => {
  return (
    <input
      type="submit"
      className={classnames("btn", {
        [`btn-${buttonType}`]: true,
        "btn-block": block
      })}
      value={value}
      disabled={disabled}
    />
  );
};

SubmitButton.propTypes = {
  buttonType: PropTypes.string.isRequired,
  block: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};

export default SubmitButton;
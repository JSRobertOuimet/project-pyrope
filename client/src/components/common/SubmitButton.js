import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

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
  buttonType: propTypes.string.isRequired,
  block: propTypes.string,
  value: propTypes.string.isRequired,
  disabled: propTypes.string,
};

export default SubmitButton;
import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const SubmitButton = ({ buttonType, block, disabled, value }) => {
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
  value: propTypes.string.isRequired,
  primary: propTypes.string,
  block: propTypes.string,
  disabled: propTypes.string,
};

export default SubmitButton;
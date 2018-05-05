const validator = require("validator");

const validate = userInputs => {
  let errors = {};

  if(!validator.isEmail(userInputs.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if(!validator.isLength(userInputs.password)) {
    errors.password = "Password must be 8 characters long.";
  }

  return errors;
};

module.exports = validate;
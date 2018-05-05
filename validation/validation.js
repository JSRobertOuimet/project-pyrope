const validator = require("validator");

const validate = userInputs => {
  let errors = {};

  // Email
  if(!validator.isEmail(userInputs.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password
  if(!validator.isLength(userInputs.password, { min: 8 })) {
    errors.password = "The password must be at least 8 characters long.";
  }

  return errors;
};

module.exports = validate;
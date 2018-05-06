const validator = require("validator");

const validate = (userInputs, action) => {
  let errors = {};

  switch(action) {
  case "register":
    emailValidation(userInputs.email);
    passwordValidation(userInputs.password);
    break;
  case "updateOrCreateProfile":
    usernameValidation(userInputs.username);
    aboutValidation(userInputs.about);
    break;
  default:
    console.log("none");
  }

  return errors;

  function emailValidation(email) {
    if(!validator.isEmail(email + "")) {
      return errors.email = "Please enter a valid email address.";
    }
  }

  function passwordValidation(password) {
    if(!validator.isLength(password + "", { min: 8 })) {
      return errors.password = "The password must be at least 8 characters long.";
    }
  }

  function usernameValidation(username) {
    if(!validator.isLength(username + "", { min: 2, max: 40 })) {
      return errors.username = "Your username must be between 2 and 40 characters long.";
    }
  }

  function aboutValidation(about) {
    if(!validator.isLength(about + "", { max: 40 })) {
      return errors.username = "Your profile’s about section cannot exceed 140 characters.";
    }
  }
};

module.exports = validate;
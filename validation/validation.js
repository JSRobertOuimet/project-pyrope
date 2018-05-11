const
  validator = require("validator"),
  messages = require("../messaging/messaging");

const validate = (userInputs, action) => {
  let errors = {};

  switch(action) {
  case "registerUser":
    emailValidation(userInputs.email);
    passwordValidation(userInputs.password);
    break;
  case "resetPassword":
    emailValidation(userInputs.email);
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
      return errors.email = messages.errorInvalidEmail;
    }
  }

  function passwordValidation(password) {
    if(!validator.isLength(password + "", { min: 8 })) {
      return errors.password = messages.errorInvalidPassword;
    }
  }

  function usernameValidation(username) {
    if(!validator.isLength(username + "", { min: 2, max: 40 })) {
      return errors.username = messages.errorInvalidUsername;
    }
  }

  function aboutValidation(about) {
    if(!validator.isLength(about + "", { max: 40 })) {
      return errors.about = messages.errorInvalidAbout;
    }
  }
};

module.exports = validate;
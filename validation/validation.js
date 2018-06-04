const
  validator = require("validator"),
  messages = require("../messaging/messaging");

const validate = (userInputs, action) => {
  let errors = {};

  switch(action) {
    case "registerUser":
      emailValidation(userInputs.email);
      passwordValidation(userInputs.password);
      confirmPasswordValidation(userInputs.password, userInputs.confirmPassword);
      break;
    case "signInUser":
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
    case "createChallenge":
      titleValidation(userInputs.title);
      authorValidation(userInputs.author);
      bookNumberOfPagesValidation(userInputs.bookNumberOfPages);
      goalNumberOfPagesValidation(userInputs.goalNumberOfPages);
      break;
    default:
      console.log("Some other error...");
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

  function confirmPasswordValidation(password, confirmPassword) {
    if(password !== confirmPassword) {
      return errors.confirmPassword = messages.errorUnmatchedPasswords;
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

  function titleValidation(title) {
    if(validator.isEmpty(title + "")) {
      return errors.title = messages.errorInvalidTitle;
    }
  }

  function authorValidation(author) {
    if(validator.isEmpty(author + "")) {
      return errors.author = messages.errorInvalidAuthor;
    }
  }

  function bookNumberOfPagesValidation(numberOfPages) {
    if(!(numberOfPages > 0)) {
      return errors.bookNumberOfPages = messages.errorInvalidBookNumberOfPages;
    }
  }

  function goalNumberOfPagesValidation(numberOfPages) {
    if(!(numberOfPages > 0)) {
      return errors.goalNumberOfPages = messages.errorInvalidGoalNumberOfPages;
    }
  }
};

module.exports = validate;
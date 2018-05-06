const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),

  jwtKey = require("../config/credentials").jwtKey,

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  User = require("../models/User");

// Log in (public)
router.post("/", (req, res) => {
  const errors = validateUserInputs(req.body);

  if(Object.keys(errors).length > 0) {
    res
      .status(422)
      .json(errors);
  }
  else {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          res
            .status(401)
            .json({ message: messages.errorIncorrectEmailOrPassword });
        }
        else {
          bcrypt
            .compare(req.body.password, user.password)
            .then(isMatch => {
              if(isMatch) {
                const payload = { id: user.id };

                jwt.sign(payload, jwtKey, { expiresIn: 3600 }, (err, token) => {
                  if(err) throw err;
                  res
                    .status(303)
                    .json({ message: messages.successLoggedIn, token: "Bearer " + token });
                });
              }
              else {
                res
                  .status(401)
                  .json({ message: messages.errorIncorrectEmailOrPassword });
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;
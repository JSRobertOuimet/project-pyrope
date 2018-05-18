const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),

  jwtKey = require("../../config/credentials").jwtKey,

  validateUserInputs = require("../../validation/validation"),
  messages = require("../../messaging/messaging"),

  User = require("../../models/User");

// @desc      POST existing user's credentials to sign in
// @access    Public
router.post("/", (req, res) => {
  const errors = validateUserInputs(req.body, "signInUser");

  if(Object.keys(errors).length > 0) {
    res
      .status(400)
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

                jwt.sign(payload, jwtKey, { expiresIn: 3600 /* 1 hour */ }, (err, token) => {
                  if(err) throw err;
                  res
                    .json({
                      message: messages.successSignedIn,
                      token: "Bearer " + token
                    });
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
const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  sg = require("@sendgrid/mail"),

  jwtKey = require("../config/credentials").jwtKey,
  sgAPIKey = require("../config/credentials").sgAPIKey,

  validate = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  User = require("../models/User");

// @desc      POST new user
// @access    Private
router.post("/register", (req, res) => {
  const errors = validate(req.body, "registerUser");

  if(Object.keys(errors).length > 0) {
    res
      .status(400)
      .json(errors);
  }
  else {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          res
            .status(409)
            .json({ message: messages.errorEmailAlreadyUsed });
        }
        else {
          const newUser = new User({
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err;

            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;

              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json({ message: messages.successRegisteredUser, user }))
                .catch(err => console.log(err));
            });
          });
        }
      })
      .catch(err => console.log(err));
  }
});

// @desc      POST existing user's credentials to sign in
// @access    Public
router.post("/sign-in", (req, res) => {
  const errors = validate(req.body, "signInUser");

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
                    .status(200)
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

// @desc      POST request to obtain reset password link
// @access    Public
router
  .post("/reset-password", (req, res) => {
    const errors = validate(req.body, "resetPassword");

    if(Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      sg.setApiKey(sgAPIKey);
      const msg = {
        to: `${req.body.email}`,
        from: "reset@project-pyrope.com",
        subject: "Reset Password",
        text: "Here's the link to reset your password!",
        html: "<p>Here's the link to reset your password!"
      };

      sg.send(msg);

      res
        .status(200)
        .json({ message: messages.successEmailSent });
    }
  });

module.exports = router;
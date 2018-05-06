const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),

  validate = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  User = require("../models/User");

// Register user (private)
router.post("/", (req, res) => {
  const errors = validate(req.body, "register");

  if(Object.keys(errors).length > 0) {
    res
      .status(422)
      .json(errors);
  }
  else {
    User
      .findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          res
            .status(422)
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

module.exports = router;
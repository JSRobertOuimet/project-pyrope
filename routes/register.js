const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),

  validateUserInputs = require("../validation/validation"),

  User = require("../models/User");

// Register user
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
        if(user) {
          res
            .status(409)
            .json({ email: "This email address has already been used."});
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
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
  }
});

module.exports = router;
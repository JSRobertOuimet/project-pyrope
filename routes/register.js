const
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),

  User = require("../models/User");

// ==============================
// POST requests
router.post("/", (req, res) => {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        res
          .status(409)
          .json({ error: "This email has already been registered."});
      }
      else {
        newUser = new User({
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
});

module.exports = router;
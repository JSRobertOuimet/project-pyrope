const
  express = require("express"),
  router = express.Router(),

  messages = require("../messaging/messaging"),

  User = require("../models/User");

// Get all users (public)
router
  .get("/", (req, res) => {
    User
      .find()
      .then(users => {
        if(users.length === 0) {
          res
            .status(400)
            .json({ message: messages.errorNoUserFound });
        }
        else {
          res
            .status(200)
            .json(users);
        }
      })
      .catch(err => console.log(err));
  });

// Get specific user with username (public)
router
  .get("/:username", (req, res) => {
    res
      .send(`User with id ${req.params.username}...`);
  });

module.exports = router;
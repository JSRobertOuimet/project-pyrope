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
            .status(404)
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

module.exports = router;
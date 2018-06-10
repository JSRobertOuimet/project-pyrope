const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  messages = require("../messaging/messaging"),

  Session = require("../models/Session");

router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Session
      .find({ userId: req.user.id })
      .then(sessions => {
        if(!sessions) {
          res.status(404).json({ message: messages.errorNoSessionFound });
        }
        else {
          res.status(200).json(sessions);
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router;
const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../../validation/validation"),
  messages = require("../../messaging/messaging"),

  Profile = require("../../models/Profile");

router
  .post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send("Account!");
  });

module.exports = router;
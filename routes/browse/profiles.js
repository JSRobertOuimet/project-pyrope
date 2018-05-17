const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  messages = require("../../messaging/messaging"),

  Profile = require("../../models/Profile");

// @desc      GET all public profiles
// @access    Private
router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .find({ public: true })
      .then(profiles => {
        if (profiles.length === 0) {
          res
            .status(404)
            .json({ message: messages.errorNoProfileFound });
        }
        else {
          res
            .status(200)
            .json(profiles);
        }
      })
      .catch(err => console.log(err));
  });

// @desc      GET specific public profile by username
// @access    Private
router
  .get("/:username", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ username: req.params.username })
      .then(profile => {
        if (!profile || profile.public === false) {
          res
            .status(400)
            .json({ message: messages.errorNoProfileFound });
        }
        else {
          res
            .status(200)
            .json(profile);
        }
      })
      .catch(err => console.log(err));
  });

module.exports = router;
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

module.exports = router;
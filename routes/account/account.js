const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../../validation/validation"),
  messages = require("../../messaging/messaging"),

  User = require("../../models/User"),
  Profile = require("../../models/Profile");

// @desc      GET logged in user's account
// @access    Private
router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    User
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => console.log(err));
  });

// @desc      POST user profile (create or edit)
// @access    Private
router
  .post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const
      errors = validateUserInputs(req.body, "updateOrCreateProfile"),
      profileData = {};

    if (Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      profileData.userId = req.user.id;
      profileData.username = req.body.username;
      profileData.about = req.body.about;

      Profile
        .findOne({ userId: req.user.id })
        .then(profile => {
          // Update existing profile
          if (profile) {
            Profile
              .findOneAndUpdate(
                { userId: req.user.id },
                { $set: profileData },
                { new: true }
              )
              .then(profile => {
                res
                  .status(200)
                  .json({ message: messages.successUpdatedProfile, profile });
              })
              .catch(err => console.log(err));
          }
          // Create new profile
          else {
            Profile
              .findOne({ username: profileData.username })
              .then(profile => {
                if (profile) {
                  res
                    .status(409)
                    .json({ message: messages.errorUsernameAlreadyUsed });
                }
                else {
                  new Profile(profileData)
                    .save()
                    .then(profile => {
                      res
                        .status(201)
                        .json({ message: messages.successCreatedProfile, profile });
                    })
                    .catch(err => console.log(err));
                }
              })
              .catch(err => console.log(err));
          }
        });
    }
  });

module.exports = router;
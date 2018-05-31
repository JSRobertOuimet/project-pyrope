const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  User = require("../models/User"),
  Profile = require("../models/Profile");

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

// @desc      GET signed in user's profile
// @access    Private
router
  .get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
    User
      .findOne({ _id: req.user.id })
      .then(user => {
        Profile
          .findOne({ userId: req.user.id })
          .then(profile => {
            res.json({
              userId: profile.userId,
              registrationDate: user.registrationDate,
              email: user.email,
              username: profile.username,
              about: profile.about,
              friends: profile.friends,
              public: profile.public
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// @desc      POST user profile (create or edit)
// @access    Private
router
  .post("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
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
      profileData.public = req.body.public;

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

// @desc      DELETE user account and profile
// @access    Private
router
  .delete("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOneAndRemove({ userId: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => {
            res
              .status(200)
              .json({ message: messages.successDeletedProfileAndUser });
          })
          .catch(err => console.log(err));
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
const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  Profile = require("../models/Profile"),
  Challenge = require("../models/Challenge"),
  Session = require("../models/Session");

// @desc      GET logged in user's dashboard
// @access    Private
router
  .get("/dashboard", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ user_id: req.user.id })
      .then(profile => {
        res.send(profile);
      })
      .catch(err => console.log(err));
  });

// @desc      GET all public profiles
// @access    Private
router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .find({ public: true })
      .then(profiles => {
        if(profiles.length === 0) {
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
        if(!profile || profile.public === false) {
          res
            .status(400)
            .json({ message: messages.errorNoProfileFound });
        }
        else if(profile.user_id === req.user.id) {
          res
            .status(302)
            .redirect("dashboard");
        }
        else {
          res
            .status(200)
            .json(profile);
        }
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

    if(Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      profileData.user_id = req.user.id;
      profileData.username = req.body.username;
      profileData.about = req.body.about;

      Profile
        .findOne({ user_id: req.user.id })
        .then(profile => {
          // Update existing profile
          if(profile) {
            Profile
              .findOneAndUpdate(
                { user_id: req.user.id },
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
                if(profile) {
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

// @desc      POST challenge
// @access    Private
router
  .post("/me/challenges", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ user_id: req.user.id })
      .then(profile => {
        const challenge = new Challenge({
          book: {
            author: req.body.author,
            title: req.body.title,
            numberOfPages: req.body.bookNumberOfPages
          },
          goal: {
            numberOfPages: req.body.goalNumberOfPages,
            timePeriod: req.body.goalTimePeriod
          }
        });

        profile.challenges
          .unshift(challenge);

        profile
          .save()
          .then(profile => {
            res
              .status(201)
              .json({ message: messages.successCreatedChallenge, profile });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// @desc      POST session for a specific challenge
// @access    Private
router
  .post("/me/challenges/:challenge_id/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ user_id: req.user.id })
      .then(profile => {
        const challenges = profile.challenges;

        challenges.forEach(challenge => {
          if(challenge._id.toString() === req.params.challenge_id) {
            const session = new Session({
              numberOfPagesRead: req.body.numberOfPagesRead,
              notes: req.body.notes
            });

            challenge.sessions
              .unshift(session);

            profile.markModified("challenges");

            profile
              .save()
              .then(profile => {
                res
                  .status(201)
                  .json({ message: messages.successCreatedSession, profile });
              })
              .catch(err => console.log(err));
          }
        });
      })
      .catch(err => console.log(err));
  });

module.exports = router;
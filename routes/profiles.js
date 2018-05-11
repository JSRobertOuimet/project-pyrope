const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  Profile = require("../models/Profile"),
  Challenge = require("../models/Challenge"),
  Session = require("../models/Session");

// Get all public profiles (public)
router
  .get("/", (req, res) => {
    Profile
      .find()
      .then(profiles => {
        if(profiles.length === 0) {
          res
            .status(404)
            .json({ message: messages.errorNoProfileFound });
        }
        else {
          res
            .json(profiles);
        }
      })
      .catch(err => console.log(err));
  });

// Get specific public profile by username (public)
router
  .get("/:username", (req, res) => {
    Profile
      .findOne({ username: req.params.username })
      .then(profile => {
        if(!profile) {
          res
            .status(404)
            .json({ message: messages.errorNoProfileFound });
        }
        else {
          res
            .status(200)
            .json({ message: messages.successProfileFound, profile });
        }
      })
      .catch(err => console.log(err));
  });

// Create or update user's profile (private)
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

// Create challenge (private)
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

// Create session (private)
router
  .post("/me/challenges/:challenge_id", passport.authenticate("jwt", { session: false }), (req, res) => {
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
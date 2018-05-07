const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  Profile = require("../models/Profile"),
  Challenge = require("../models/Challenge");

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

// Create or update authenticated user's profile (private)
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
      profileData.public = req.body.public;

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

router
  .post("/me/challenge", (req, res) => {
    const
      errors = validateUserInputs(req.body, "createChallenge"),
      challengeData = {};

    if(Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      challengeData.book.author = req.body.bookAuthor;
      challengeData.book.title = req.body.bookTitle;
      challengeData.book.numberOfPages = req.body.bookNumberOfPages;
      challengeData.readingGoal.numberOfPages = req.body.readingGoalNumberOfPages;
      challengeData.readingGoal.timePeriod = req.body.readingGoalTimePeriod;
      challengeData.public = req.body.public;
    }
  });

module.exports = router;
const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  messages = require("../../messaging/messaging"),

  Profile = require("../../models/Profile"),
  Challenge = require("../../models/Challenge"),
  Session = require("../../models/Session");

// @desc      GET specific challenge
// @access    Private
router
  .get("/:challengeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ userId: req.user.id })
      .then(profile => {
        const challenges = profile.challenges;

        challenges.forEach(challenge => {
          if(challenge._id.toString() === req.params.challengeId) {
            res
              .status(200)
              .json(challenge);
          }
        });
      })
      .catch(err => console.log(err));
  });

// @desc      POST challenge
// @access    Private
router
  .post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ userId: req.user.id })
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

// @desc      DELETE specific challenge
// @access    Private
router
  .delete("/:challengeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ userId: req.user.id })
      .then(profile => {
        const challenges = profile.challenges;

        const index = challenges
          .map(challenge => challenge._id.toString())
          .indexOf(req.params.challengeId);

        challenges.splice(index, 1);
        profile.markModified("challenges");
        profile
          .save()
          .then(profile => {
            res
              .status(200)
              .json({ message: messages.successDeletedChallenge, profile });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// @desc      GET session for a specific challenge
// @access    Private
router
  .get("/:challengeId/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ userId: req.user.id })
      .then(profile => {
        const challenges = profile.challenges;
        let currentChallenge;

        challenges.forEach(challenge => {
          if(challenge._id.toString() === req.params.challengeId) {
            currentChallenge = challenge;
          }
        });

        res
          .status(200)
          .json(currentChallenge.sessions);
      })
      .catch(err => console.log(err));
  });

// @desc      POST session for a specific challenge
// @access    Private
router
  .post("/:challengeId/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile
      .findOne({ userId: req.user.id })
      .then(profile => {
        const challenges = profile.challenges;

        challenges.forEach(challenge => {
          if (challenge._id.toString() === req.params.challengeId) {
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